import Homepage from "./Homepage";
import Rooms from "./Rooms";
import Chat from "./Chat";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import { useSockets } from "../context/socket.context"


export default function App() {
  //use socket context to see if username exists, render content depending on true or false
  const { nickname } = useSockets()

  return (
    <Box>
      <Navbar />
      {nickname ?
        <><Rooms /></> :
        <Homepage />
      }
    </Box>

  );
}