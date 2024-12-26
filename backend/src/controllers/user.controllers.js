import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const userRegister = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body

    if ([fullName, password, email].some((field) => typeof field !== "string" || field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(401, "User is existed already with email")
    }

    const user = await User.create(
        {
            fullName,
            email,
            password
        }
    )
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // console.log(createdUser);

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201)
        .json(
            new ApiResponse(201, { createdUser }, "User register successfully")
        )
})

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }

    const isPassworValid = await user.isPasswordCorrect(password)

    console.log(isPassworValid);

    if (!isPassworValid) {
        throw new ApiError(401, "Invaild email or password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const options = {
        httpOnly: true,
        secure: true,
    }

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { loggedUser }, "User logged successfully")
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .clearCookie("token", options)
        .json(
            new ApiResponse(200, "User logged out")
        )
})

const getUserProfile = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(
            new ApiResponse(200, req.user, "Current user fetch successflly")
        )
})

export {
    userRegister,
    userLogin,
    logoutUser,
    getUserProfile,

}