import dotenv from "dotenv"; 
import express from 'express';
import cors from 'cors';

dotenv.config({
    path:"/.env"
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

import userRouter from "./routers/user.router.js"

app.use("/api/v1/users", userRouter )

export  {app};