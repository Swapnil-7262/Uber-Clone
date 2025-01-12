import { Ride } from "../models/ride.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import { createRides, getFare } from "../services/ride.service.js";

export const createRide = asyncHandler(async(req, res)=>{

    const {pickup, destination, vehicleType} = req.body

    const ride = await createRides({user:req.user._id, pickup, destination, vehicleType})

    if (!ride) {
        throw new ApiError (500, "Ride is not created")
    }

    res.status(201)
    .json(
        new ApiResponse(201, ride,  "Ride create successfully")
    )
}) 

export const fare = asyncHandler(async(req, res)=>{
    const {pickup , destination} = req.query
    
    if(!pickup || !destination){
        throw new ApiError(404, "Pick and Destination are required ")
    }

    const fareValue = await getFare(pickup, destination)
    
    if (!fareValue) {
        throw new ApiError(500, 'Internal server problem')
    }

    res.status(200)
    .json(
        new ApiResponse(200, fareValue,"Fare value fetch successfully")
    )
})