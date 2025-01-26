import { Server } from "socket.io";
import { User } from "./models/user.model.js"
import { Captain } from "./models/captain.model.js"

let io;
 function initializeSocket (server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            method: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join',async (data) => {
            const { userId, userType } = data

            console.log("userId=",userId);
            console.log("userType=",userType);
            
            if (userType === 'user') {
               await User.findByIdAndUpdate(userId,
                {
                    $set:{
                        socketId: socket.id,
                    }
                },
                {
                    new:true
                }
               )
            //    console.log(socket.id);
               
            }
            else if (userType === 'captain') {
                await Captain.findByIdAndUpdate(userId, 
                    {
                        $set:{
                            socketId: socket.id,
                        }
                    },
                    {
                        new:true
                    }
                )
            }
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);

        })
    })
}

export { initializeSocket }