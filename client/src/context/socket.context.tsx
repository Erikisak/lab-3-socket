import io from "socket.io-client"
import { createContext, useContext } from "react"
import { SOCKET_URL } from "../config/default"

const socket = io(SOCKET_URL)
const SocketContext = createContext({ socket })

export default function SocketsProvider(props: any) {

    return <SocketContext.Provider value={{ socket }} {...props} />
}

export const useSockets = () => useContext(SocketContext)
