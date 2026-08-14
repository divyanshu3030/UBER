const axios = require("axios");

module.exports.getAddressCooordinate = async (address) => { 
    const apikey = process.env.GOOGLE_MAPS_API_KEY; // Ensure you have your Google Maps API key set in your environment variables
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch Coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apikey = process.env.GOOGLE_MAPS_API_KEY; // Ensure you have your Google Maps API key set in your environment variables
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No route found between the origin and destination');
            }

            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch Distance and Time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getAuthCompleteSuggestions = async (input) => { 
    if(!input) {
        throw new Error('query is required');
    }

    const apikey = process.env.GOOGLE_MAPS_API_KEY; // Ensure you have your Google Maps API key set in your environment variables
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch Suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}