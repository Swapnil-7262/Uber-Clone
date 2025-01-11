import dotenv from "dotenv"; 
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config({
    path:"/.env"
})

const app = express();

app.use(cors({origin: 'http://localhost:5173',
    credentials: true,}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

import userRouter from "./routers/user.router.js"
import captainRouter from "./routers/captain.router.js"
import mapsRouter from "./routers/maps.route.js"

app.use("/api/v1/users", userRouter )
app.use("/api/v1/captains", captainRouter )
app.use("/api/v1/maps", mapsRouter )

export  {app};