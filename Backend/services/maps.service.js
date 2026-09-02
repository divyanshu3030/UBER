const axios = require("axios");
const captainModel = require('../models/captain.model');

const NOMINATIM_URL = "https://nominatim.openstreetmap.org";
const OSRM_URL = "https://router.project-osrm.org";

const nominatimConfig = {
    headers: {
        "User-Agent": "UberClone/1.0 (divyanshunegi9458@gmail.com)",
        "Accept-Language": "en"
    },
    timeout: 10000
};

// ===============================
// GET COORDINATES
// ===============================
module.exports.getAddressCooordinate = async (address) => {

    if (!address) {
        throw new Error("Address is required");
    }

    try {

        const response = await axios.get(`${NOMINATIM_URL}/search`, {
            ...nominatimConfig,
            params: {
                q: address,
                format: "json",
                limit: 1,
                addressdetails: 1,
                countrycodes: "in"
            }
        });

        if (!response.data || response.data.length === 0) {
            throw new Error("Location not found");
        }

        const location = response.data[0];

        return {
            ltd: parseFloat(location.lat),
            lng: parseFloat(location.lon)
        };

    } catch (error) {

        console.error(
            "Coordinate Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};


// ===============================
// GET DISTANCE & TIME
// ===============================
module.exports.getDistanceTime = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    try {

        // Origin coordinates
        const originResponse = await axios.get(
            `${NOMINATIM_URL}/search`,
            {
                ...nominatimConfig,
                params: {
                    q: origin,
                    format: "json",
                    limit: 1,
                    countrycodes: "in"
                }
            }
        );

        // Destination coordinates
        const destinationResponse = await axios.get(
            `${NOMINATIM_URL}/search`,
            {
                ...nominatimConfig,
                params: {
                    q: destination,
                    format: "json",
                    limit: 1,
                    countrycodes: "in"
                }
            }
        );

        if (
            originResponse.data.length === 0 ||
            destinationResponse.data.length === 0
        ) {
            throw new Error("Location not found");
        }

        const originLocation = originResponse.data[0];
        const destinationLocation = destinationResponse.data[0];

        const originCoords =
            `${originLocation.lon},${originLocation.lat}`;

        const destinationCoords =
            `${destinationLocation.lon},${destinationLocation.lat}`;

        // OSRM route
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
            "Distance Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};


// ===============================
// LOCATION SUGGESTIONS
// ===============================
module.exports.getAuthCompleteSuggestions = async (input) => {

    if (!input || input.trim().length < 3) {
        return [];
    }

    try {

        const response = await axios.get(
            `${NOMINATIM_URL}/search`,
            {
                ...nominatimConfig,
                params: {
                    q: input,
                    format: "json",
                    addressdetails: 1,
                    limit: 5,
                    countrycodes: "in"
                }
            }
        );

        return response.data.map((place) => ({
            description: place.display_name,
            place_id: place.place_id,
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon)
        }));

    } catch (error) {

        console.error(
            "Suggestion Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

module.exports.getCaptainInTheRadius = async (lat, lng, radius) => {
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