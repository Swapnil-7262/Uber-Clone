import { Server } from "socket.io";
import { User } from "./models/user.model.js"
import { Captain } from "./models/captain.model.js"

let io;
function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            method: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', () => {
            const { userId, userType } = data

            if (userType === 'user') {
                User.findByIdAndUpdate(userId, { socketId: socket.id })
            }
            else if (userType === 'captain') {
                User.findByIdAndUpdate(userId, { socketId: socket.id })
            }
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);

        })
    })
}

export { initializeSocket }