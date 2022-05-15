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
    roomsArray: { id: string, room: string}[];
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
    const [roomId, setRoomId] = useState("");
    const [roomName, setRoomName] = useState("");
//below is prob unnecessary
    const [rooms, setRooms] = useState([]);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [roomsArray, setRoomsArray] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState<string>('');

    /*
        //recieves room and users
        socket.on('roomUsers', ({ room, users }) => {
            outputRoomName(room);
            outputUsers(users);
        })
    
         //Message from server, chat component
        socket.on('message', message => {
            console.log(message)
            outputMessage(message);
    
            //scroll down when new message posted
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }) */

    /*     //Message submit, sends message to server, chat component
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            // get message from input value. msg=input id
            const msg = e.target.elements.msg.value;
    
            // emit message to server
            socket.emit('chatMessage', msg);
    
            //clear input & focus input
            e.target.elements.msg.value = '';
            e.target.elements.msg.focus();
        }) */

    /*     //add roomname to dom, need this for list of rooms and as a header?
        function outputRoomName(room) {
            roomName.innerText = room;
        } */

    /*     //add users to dom, do this inside a sidebar component
        function outputUsers(users) {
            userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
        `
        } */

    /*     socket.on(EVENTS.SERVER.ROOMS, (value) => {
            setRooms(value);
        }); */


    socket.on('isTyping', (username: string) => {
        if (username) setIsTyping(`${username} is typing...`);
        setTimeout(() => setIsTyping(''), 2000);
    });

    return (
        <SocketContext.Provider
            value={{
                socket,
                nickname,
                roomName,
                rooms,
                roomId,
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
