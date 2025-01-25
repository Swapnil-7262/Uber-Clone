import { createContext, useEffect } from "react";
import {io} from "socket.io-client"

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketProvider=({children})=>{

    useEffect(() => {
    
        socket.on('connect',()=>{
            console.log("connect to server");
        })
        socket.on('disconnect',()=>{
            console.log("disconnect to server");
        })
    }, [])
    
    const sendMessage = (evenName, message)=>{

        socket.emit(evenName, message);

    }
    const receiveMessage = (evenName, callback)=>{

        socket.on(evenName, callback);
    }

    return(
        <SocketContext.Provider value={{sendMessage, receiveMessage}}>
            {children}
        </SocketContext.Provider>
    )

}

export default SocketProvider

