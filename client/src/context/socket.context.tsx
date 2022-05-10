import io, { Socket } from "socket.io-client"
import { createContext, useContext, useState } from "react"
import EVENTS from "../config/events"

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
}

const SocketContext = createContext<ContextInterface>({ socket, nickname: '', setNickname: () => false, roomId: '', rooms: {}, joinedRoom: false, setJoinedRoom: () => false })


export default function SocketsProvider(props: any) {
    const [nickname, setNickname] = useState('');
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState([]);
    const [joinedRoom, setJoinedRoom] = useState(false);

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

    return (
        <SocketContext.Provider value={{ socket, nickname, rooms, roomId, joinedRoom, setJoinedRoom, setNickname }} {...props} />
    )
}

//import this in components to utilize context
export const useSockets = () => useContext(SocketContext)
