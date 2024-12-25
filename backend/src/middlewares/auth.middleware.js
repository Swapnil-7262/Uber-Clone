import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import { Captain } from "../models/captain.model.js";


export const authUser = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodeToken._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid access token")
    }
})


export const authCaptain = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const captain = await Captain.findById(decodeToken._id).select("-password -refreshToken")

        if (!captain) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.captain = captain
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid access token")
    }
})