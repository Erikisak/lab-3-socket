import io, { Socket } from "socket.io-client"
import { createContext, useContext, useState } from "react"


//enables interaction between client and server
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:4000"
const socket = io(SOCKET_URL)


interface ContextInterface {
    socket: Socket;
    nickname?: string;
    setNickname: Function;
}

const SocketContext = createContext<ContextInterface>({ socket, setNickname: () => false })


export default function SocketsProvider(props: any) {
    const [ nickname, setNickname ] = useState('')

    return (
        <SocketContext.Provider value={{ socket, nickname, setNickname }} {...props} />
    )
}

//import this in components to utilize context
export const useSockets = () => useContext(SocketContext)
