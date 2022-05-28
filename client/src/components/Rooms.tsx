import '../style.css'
import CreateRoom from "./CreateRoom";
import { useSockets } from "../context/socket.context";
import Chat from "./Chat";


export default function Rooms() {
    const { joinedRoom } = useSockets();

    return (
        !joinedRoom ?
            <CreateRoom />
            :
            <Chat />
    );
}