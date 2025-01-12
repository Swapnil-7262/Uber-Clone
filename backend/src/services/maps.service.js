import axios from "axios"
import { ApiError } from "../utils/ApiError.js";
const getAddressCoordinate = async(address)=>{

    const apiKey = process.env.TOMTOM_MAPS_API
    const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${apiKey}`;

    try {
        
        const response = await axios.get(url);

        // console.log(response.data);
        
        
        if (response) {
            // const location = response.data.results[0].position;
            const { lat, lon } = response.data.results[0].position;
            // console.log('Latitude:', lat, 'Longitude:', lon);
            return {lat , lon}
            
        }
        else{
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getDistanceTimes = async(origin, destination)=>{

    if (!origin || !destination) {
        throw new ApiError(401, "Origin and Distination are required")
    }

    const apiKey = process.env.TOMTOM_MAPS_API
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${origin.lat},${origin.lon}:${destination.lat},${destination.lon}/json?key=${apiKey}
`

    try {
        const response = await axios.get(url);
        const route = response.data.routes[0].summary;
        // const distanceInMeters = route.summary.lengthInMeters; // Distance in meters
        // const travelTimeInSeconds = route.summary.travelTimeInSeconds; // Time in seconds

        // // Convert to desired units
        // const distanceInKm = (distanceInMeters / 1000).toFixed(2); // Distance in km
        // const travelTimeInMinutes = (travelTimeInSeconds / 60).toFixed(2); // Time in minutes
        //     const travelTimeInHours = (travelTimeInSeconds / 3600).toFixed(2);
            
        // console.log(`Distance: ${distanceInKm} km`);
        // console.log(`Travel Time: ${travelTimeInMinutes} hours`);

        if (!route) {
            throw new Error('Unable to fetch route');  
        }
        return route;
        
    } catch (error) {
        console.error(error)
        throw error;
    }
}   

const getAutoCompleteSuggestions = async(input)=>{

    const apiKey= process.env.TOMTOM_MAPS_API
    const url =`https://api.tomtom.com/search/2/search/${encodeURIComponent(input)}.json?key=${apiKey}`   
    try {
        const response = await axios.get(url);
        // console.log(response.data);
        const data = response.data;
        // console.log(data);
        
        // Extract suggestions
        // const suggestions = data.results.map((result) => ({
        //     address: result.address.freeformAddress,
        //     position: result.position, // Include latitude and longitude
        // }));

        return data; 
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export {getAddressCoordinate, getDistanceTimes, getAutoCompleteSuggestions}