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
    roomName: string;
    setRoomName: Function;
    messages: { message: string; username: string; time: string }[] ;
    setMessages: Function;

}

const SocketContext = createContext<ContextInterface>({
    socket, nickname: '',
    setNickname: () => false,
    roomId: '',
    rooms: {},
    joinedRoom: false,
    setJoinedRoom: () => false,
    roomName: '',
    setRoomName: () => false,
    messages: [], 
    setMessages: () => false,
  
})


export default function SocketsProvider(props: any) {
    const [nickname, setNickname] = useState('');
    const [roomId, setRoomId] = useState("");
    const [roomName, setRoomName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [messages, setMessages] = useState([]);

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

        // socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        //     setRoomId(value);
    
        //     setMessages([]);
        // });


        

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
                setNickname,
                setRoomName,
                messages, 
                setMessages,
         
            }} {...props} />
    )
}

//import this in components to utilize context
export const useSockets = () => useContext(SocketContext)
