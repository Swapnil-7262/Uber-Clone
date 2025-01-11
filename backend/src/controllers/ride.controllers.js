import { Ride } from "../models/ride.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import { createRides } from "../services/ride.service.js";

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