import io, { Socket } from "socket.io-client"
import { createContext, useContext, useState } from "react"
import EVENTS from "../config/events";




//enables interaction between client and server
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:4000"
const socket = io(SOCKET_URL)


interface ContextInterface {
    socket: Socket;
    nickname?: string;
    setNickname: Function;
    roomId?: string;
    rooms: object;

}

const SocketContext = createContext<ContextInterface>({ socket, setNickname: () => false, rooms: {},  })


export default function SocketsProvider(props: any) {
    const [ nickname, setNickname ] = useState('');
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState([]);

    socket.on(EVENTS.SERVER.ROOMS, (value) => {
        setRooms(value);
    });

    return (
        <SocketContext.Provider value={{ socket, nickname, setNickname, rooms, roomId }} {...props} />
    )
}

//import this in components to utilize context
export const useSockets = () => useContext(SocketContext)
