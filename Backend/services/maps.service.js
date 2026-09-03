const axios = require("axios");
const captainModel = require("../models/captain.model");

const GEOAPIFY_URL = "https://api.geoapify.com/v1";
const OSRM_URL = "https://router.project-osrm.org";

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

// ======================================
// SIMPLE IN-MEMORY CACHE
// ======================================

const locationCache = new Map();

const CACHE_TIME = 10 * 60 * 1000; // 10 minutes


// ======================================
// GEOAPIFY GEOCODING
// ======================================

const searchGeoapify = async (query, limit = 1, autocomplete = false) => {

    if (!query || query.trim().length < 3) {
        return [];
    }

    const cacheKey =
        `${autocomplete ? "auto" : "search"}_${query.toLowerCase().trim()}_${limit}`;

    // Check cache
    const cached = locationCache.get(cacheKey);

    if (cached && Date.now() - cached.time < CACHE_TIME) {

        console.log("📦 Using cached location:", query);

        return cached.data;
    }

    try {

        const endpoint = autocomplete
            ? `${GEOAPIFY_URL}/geocode/autocomplete`
            : `${GEOAPIFY_URL}/geocode/search`;

        console.log("🌍 Geoapify request:", query);

        const response = await axios.get(endpoint, {

            params: {
                text: query,
                format: "json",
                limit: limit,
                lang: "en",
                filter: "countrycode:in",
                apiKey: GEOAPIFY_API_KEY
            },

            timeout: 10000
        });

        const results = response.data.results || [];

        // Save in cache
        locationCache.set(cacheKey, {
            time: Date.now(),
            data: results
        });

        console.log(
            "✅ Geoapify success:",
            query,
            "results:",
            results.length
        );

        return results;

    } catch (error) {

        console.error(
            "❌ Geoapify Error:",
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

    const data = await searchGeoapify(address, 1, false);

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
        throw new Error(
            "Origin and destination are required"
        );
    }

    try {

        // Origin
        const originData =
            await searchGeoapify(origin, 1, false);

        // Destination
        const destinationData =
            await searchGeoapify(destination, 1, false);

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


        // ======================================
        // OSRM ROUTING
        // ======================================

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

    const data =
        await searchGeoapify(input, 5, true);


    return data.map((place) => ({

        description:
            place.formatted ||
            place.address_line1 ||
            place.name,

        place_id:
            place.place_id,

        lat:
            parseFloat(place.lat),

        lng:
            parseFloat(place.lon)

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