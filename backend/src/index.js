import http from "http";
import { app } from "./app.js";
import connectDB from "./db/db.js";
import {initializeSocket} from "./socket.js"

const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server)

connectDB();

server.listen(port , () => {
    console.log(`Server is running on port ${port}`);
    
});