import { asyncHandler } from "../utils/asyncHnadler.js";
import { getAddressCoordinate } from "../services/maps.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { getDistanceTimes } from "../services/maps.service.js";
import { getAutoCompleteSuggestions } from "../services/maps.service.js";

const getCoordinate = asyncHandler(async(req, res)=>{
    const {address} = req.query;

    const coordinate = await  getAddressCoordinate(address)

    console.log(coordinate);
    

    if (!coordinate) {
        throw new ApiError(500, "Internal server problem")
    }

    res.status(200)
    .json(
        new ApiResponse(200, coordinate, "Coordinate successfully fetch")
    )
})

const getDistanceTime = asyncHandler(async (req, res)=>{

    const {origin , destination } = req.query
    console.log(origin, destination);
    

    if (!origin || !destination) {
        throw new ApiError(401, "Origin and Distination are required")  
    }

    const originCo = await getAddressCoordinate(origin);
    const destinationCo = await getAddressCoordinate(destination);

    const distanceTime = await getDistanceTimes(originCo, destinationCo)

    res.status(200)
    .json(
        new ApiResponse(200, distanceTime, "Distance and time successfully fetch")
    )
})

const getAutoSuggestions = asyncHandler(async(req, res)=>{
    const {input} = req.query;

    if (!input) {
        throw new ApiError(401, "Input is required")   
    }

    const suggestions = await getAutoCompleteSuggestions(input)

    res.status(200)
    .json(
        new ApiResponse(200, suggestions, "Auto complete suggestions successfully fetch")
    )
})

export {getCoordinate , getDistanceTime, getAutoSuggestions}