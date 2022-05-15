import io, { Socket } from "socket.io-client"
import { createContext, useContext, useEffect, useState } from "react"


//enables interaction between client and server
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:4000"
const socket = io(SOCKET_URL)

interface ContextInterface {
    socket: Socket;
    nickname: string;
    setNickname: Function;
    roomId: string;
    rooms: object;
    joinedRoom: boolean;
    setJoinedRoom: Function;
    roomsArray: string[];
    setRoomsArray: Function;
    roomName: string;
    setRoomName: Function;
    messages: { message: string; username: string; time: string }[];
    setMessages: Function;
    isTyping: string;
}

const SocketContext = createContext<ContextInterface>({
    socket,
    nickname: '',
    setNickname: () => false,
    roomId: '',
    rooms: {},
    joinedRoom: false,
    setJoinedRoom: () => false,
    roomsArray: [],
    setRoomsArray: () => false,
    roomName: '',
    setRoomName: () => false,
    messages: [],
    setMessages: () => false,
    isTyping: '',
})

export default function SocketsProvider(props: any) {
    const [nickname, setNickname] = useState('');
    //below is prob unnecessary
    //const [roomId, setRoomId] = useState("");
    const [roomName, setRoomName] = useState("");
    //below is prob unnecessary
    //const [rooms, setRooms] = useState([]);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [roomsArray, setRoomsArray] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState<string>('');

    socket.on('isTyping', (username: string) => {
        if (username) setIsTyping(`${username} is typing...`);
        setTimeout(() => setIsTyping(''), 2000);
    });

    
    socket.on('roomsArray', rooms => {
        setRoomsArray(rooms)
    })

    return (
        <SocketContext.Provider
            value={{
                socket,
                nickname,
                roomName,
                //rooms,
                //roomId,
                joinedRoom,
                setJoinedRoom,
                roomsArray,
                setRoomsArray,
                setNickname,
                setRoomName,
                messages,
                setMessages,
                isTyping: isTyping,
            }} {...props} />
    )
}

//import this in components to utilize context
export const useSockets = () => useContext(SocketContext)
