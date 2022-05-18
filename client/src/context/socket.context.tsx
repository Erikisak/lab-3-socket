import io, { Socket } from "socket.io-client"
import { createContext, useContext, useEffect, useState } from "react"


//enables interaction between client and server
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:4000"
const socket = io(SOCKET_URL)

interface ContextInterface {
    socket: Socket;
    nickname: string;
    setNickname: Function;
    joinedRoom: boolean;
    setJoinedRoom: Function;
    roomsObject: object;
    namesObject: object;
    roomName: string;
    setRoomName: Function;
    messages: { message: string; username: string; time: string }[];
    setMessages: Function;
    isTyping: string;
    roomsExist: boolean;
}

const SocketContext = createContext<ContextInterface>({
    socket,
    nickname: '',
    setNickname: () => false,
    joinedRoom: false,
    setJoinedRoom: () => false,
    roomsObject: {},
    namesObject: {},
    roomName: '',
    setRoomName: () => false,
    messages: [],
    setMessages: () => false,
    isTyping: '',
    roomsExist: false,
})

export default function SocketsProvider(props: any) {
    const [nickname, setNickname] = useState('');
    const [roomName, setRoomName] = useState("");
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [roomsObject, setRoomsObject] = useState({});
    const [namesObject, setNamesObject] = useState({});
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState<string>('');
    const [roomsExist, setRoomsExist] = useState(false)

    socket.on('isTyping', (username: string) => {
        if (username) setIsTyping(`${username} is typing...`);
        setTimeout(() => setIsTyping(''), 3000);
        console.log('recieving isTypinh')
    });

    socket.on('roomsObject', rooms => {
        setRoomsObject(rooms)

        if (Object.keys(rooms).length > 0) {
            setRoomsExist(true)
        } else {
            setRoomsExist(false)
            return
        }
    })

    socket.on('namesObject', value => {
        setNamesObject(value)
    })
    console.log(namesObject)
    
    return (
        <SocketContext.Provider
            value={{
                socket,
                nickname,
                roomName,
                joinedRoom,
                setJoinedRoom,
                roomsObject,
                namesObject,
                setNickname,
                roomsExist,
                setRoomName,
                messages,
                setMessages,
                isTyping: isTyping,
            }} {...props} />
    )
}

//import this in components to utilize context
export const useSockets = () => useContext(SocketContext)
