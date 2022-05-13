import { Grid } from "@mui/material";
import '../style.css'
import CreateRoom from "./CreateRoom";
import { useSockets } from "../context/socket.context";
import Chat from "./Chat";
import Sidebar from "./Sidebar";


export default function Rooms() {
    const { joinedRoom } = useSockets();

    return (
        !joinedRoom ?
            <>
                <Sidebar />
                <CreateRoom />
            </> :
            <Chat />
    );
}