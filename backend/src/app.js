import dotenv from "dotenv"; 
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config({
    path:"/.env"
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

import userRouter from "./routers/user.router.js"
import captainRouter from "./routers/captain.router.js"

app.use("/api/v1/users", userRouter )
app.use("/api/v1/captains", captainRouter )

export  {app};