import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const captainSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    refershToken: {
        type: String
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "color must be at least 3 characters long"]
        },
        plateNumber: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, "plate number must be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "capacity must be at least 1 person"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["motorcycle", "car", "auto"],
            default: "car"
        }

    },
    location: {
        ltd: {
            type: Number,

        },
        lng: {
            type: Number,
        }
    }
}, { timestamps: true })

captainSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

captainSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

captainSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
captainSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const Captain = model("Captain", captainSchema)