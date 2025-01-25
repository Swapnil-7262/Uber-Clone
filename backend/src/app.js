import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config({
    path: "/.env"
})

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

import userRouter from "./routers/user.router.js"
import captainRouter from "./routers/captain.router.js"
import mapsRouter from "./routers/maps.route.js"
import rideRouter from "./routers/ride.router.js"

app.use("/users", userRouter)
app.use("/captains", captainRouter)
app.use("/maps", mapsRouter)
app.use("/rides", rideRouter)


export { app };