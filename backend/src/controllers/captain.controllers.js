import { asyncHandler } from "../utils/asyncHnadler.js";
import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (captainId) => {
    try {
        const captain = await Captain.findById(captainId)
        const accessToken = captain.generateAccessToken()
        const refreshToken = captain.generateRefreshToken()

        captain.refreshToken = refreshToken
        await captain.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const captainRegister = asyncHandler(async (req, res) => {
    const { fullName, email, password, vehicle } = req.body;
    console.log(req.body);

    if ([fullName, email, password].some((field) => typeof field !== "string" || field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const { color, plateNumber, capacity, vehicleType } = vehicle || {};
    console.log(typeof(capacity));
    

    if (!vehicle || [color, plateNumber, vehicleType].some((field) => typeof field !== "string" || field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    if (!capacity || typeof capacity !== "number" || capacity < 1) {
        throw new ApiError(400, "Capacity must be at least 1 person")
    }


    const existedCaptain = await Captain.findOne({ email })

    if (existedCaptain) {
        throw new ApiError(401, "Captain is existed already with email")
    }

    const captain = await Captain.create({
        fullName,
        email,
        password,
        vehicle: {
            color,
            plateNumber,
            capacity,
            vehicleType
        }
    })

    const createdCaptain = await Captain.findById(captain._id).select("-password")

    if (!createdCaptain) {
        throw new ApiError(500, "Something went wrong while registering the captain")
    }

    return res.status(201)
        .json(
            new ApiResponse(201, { createdCaptain }, "Captain register successfully")
        )
})

const captainLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const captain = await Captain.findOne({ email }).select("+password")

    if (!captain) {
        throw new ApiError(401, "Invalid email or password")
    }

    const isPasswordValid = await captain.isPasswordCorrect(password)

    console.log(isPasswordValid);
    

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(captain._id)

    const loggedCaptain = await Captain.findById(captain._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { accessToken, loggedCaptain }, "Captain login successfully")
        )

})

const captainLogout = asyncHandler(async (req, res) => {
    await Captain.findByIdAndUpdate(
        req.captain._id,{
            $set:{
                refreshToken: undefined
            }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true,
        
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "Captain logout successfully")
        )
})

const getCaptainProfile = asyncHandler(async (req, res) => {
    res.status(200).
    json(
        new ApiResponse(200, { captain: req.captain }, "Captain profile retrieved successfully")
    )
})

export {
    captainRegister,
    captainLogin,
    captainLogout,
    getCaptainProfile
}