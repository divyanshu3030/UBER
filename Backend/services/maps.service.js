const axios = require("axios");
const captainModel = require("../models/captain.model");

const NOMINATIM_URL = "https://nominatim.openstreetmap.org";
const OSRM_URL = "https://router.project-osrm.org";

const nominatimConfig = {
    headers: {
        "User-Agent": "UberClone/1.0 (divyanshunegi9458@gmail.com)",
        "Accept-Language": "en",
        "Accept": "application/json"
    },
    timeout: 10000
};

// ======================================
// SIMPLE IN-MEMORY CACHE
// ======================================

const locationCache = new Map();

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes


// ======================================
// DELAY HELPER
// ======================================

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));


// ======================================
// NOMINATIM SEARCH
// ======================================

const searchNominatim = async (query, limit = 1) => {

    const cacheKey = `${query.toLowerCase().trim()}_${limit}`;

    // Check cache
    const cached = locationCache.get(cacheKey);

    if (cached && Date.now() - cached.time < CACHE_TIME) {
        console.log("📦 Using cached location:", query);
        return cached.data;
    }

    try {

        // Small delay to reduce rate-limit problems
        await delay(1100);

        const response = await axios.get(
            `${NOMINATIM_URL}/search`,
            {
                ...nominatimConfig,
                params: {
                    q: query,
                    format: "json",
                    addressdetails: 1,
                    limit,
                    countrycodes: "in"
                }
            }
        );

        // Save in cache
        locationCache.set(cacheKey, {
            time: Date.now(),
            data: response.data
        });

        return response.data;

    } catch (error) {

        if (error.response?.status === 429) {
            console.error("❌ Nominatim rate limit reached");
            throw new Error(
                "Location service is temporarily busy. Please try again."
            );
        }

        console.error(
            "❌ Nominatim Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};


// ======================================
// GET COORDINATES
// ======================================

module.exports.getAddressCooordinate = async (address) => {

    if (!address || address.trim().length < 3) {
        throw new Error("Address is required");
    }

    const data = await searchNominatim(address, 1);

    if (!data || data.length === 0) {
        throw new Error("Location not found");
    }

    const location = data[0];

    return {
        ltd: parseFloat(location.lat),
        lng: parseFloat(location.lon)
    };
};


// ======================================
// GET DISTANCE & TIME
// ======================================

module.exports.getDistanceTime = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    try {

        // Origin
        const originData = await searchNominatim(origin, 1);

        // Destination
        const destinationData = await searchNominatim(destination, 1);

        if (
            originData.length === 0 ||
            destinationData.length === 0
        ) {
            throw new Error("Location not found");
        }

        const originLocation = originData[0];
        const destinationLocation = destinationData[0];

        const originCoords =
            `${originLocation.lon},${originLocation.lat}`;

        const destinationCoords =
            `${destinationLocation.lon},${destinationLocation.lat}`;

        // OSRM
        const routeResponse = await axios.get(
            `${OSRM_URL}/route/v1/driving/${originCoords};${destinationCoords}`,
            {
                params: {
                    overview: false
                },
                timeout: 10000
            }
        );

        if (
            routeResponse.data.code !== "Ok" ||
            !routeResponse.data.routes ||
            routeResponse.data.routes.length === 0
        ) {
            throw new Error("Route not found");
        }

        const route = routeResponse.data.routes[0];

        return {
            distance: {
                text: `${(route.distance / 1000).toFixed(1)} km`,
                value: route.distance
            },

            duration: {
                text: `${Math.ceil(route.duration / 60)} mins`,
                value: route.duration
            }
        };

    } catch (error) {

        console.error(
            "❌ Distance Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};


// ======================================
// LOCATION SUGGESTIONS
// ======================================

module.exports.getAuthCompleteSuggestions = async (input) => {

    if (!input || input.trim().length < 3) {
        return [];
    }

    const data = await searchNominatim(input, 5);

    return data.map((place) => ({
        description: place.display_name,
        place_id: place.place_id,
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon)
    }));
};


// ======================================
// CAPTAINS IN RADIUS
// ======================================

module.exports.getCaptainInTheRadius = async (
    lat,
    lng,
    radius
) => {

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat],
                    radius / 6371
                ]
            }
        }
    });

    return captains;
};