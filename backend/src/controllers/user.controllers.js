import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import { ApiResponse } from "../utils/ApiResponse.js"

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

    const token = user.generateAuthToken()
    return res.status(200)
        .json(
            new ApiResponse(200, { createdUser, token }, "User register successfully")
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

    const token = user.generateAuthToken();

    return res.status(200).json(
        new ApiResponse(200, { token, user }, "User logged successfully")
    )
})

export {
    userRegister,
    userLogin,

}