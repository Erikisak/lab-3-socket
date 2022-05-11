import { Box, Button, Drawer, Grid, IconButton, Paper, SxProps, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";



function Chat() {

  const {socket, messages, roomId, nickname, setMessages, rooms} = useSockets ()
  const newMessageRef = useRef<any>(null);

  function handleSendMessage() {
    const message = newMessageRef.current.value

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {roomId, message, nickname})

    setMessages([
      ...messages,
      {
        nickname: "you",
        message,
      },
    ]);
  }

  if (!roomId) {
    return <div/>;
  }
  return (
    
    <Paper sx={paperStyle}>
      
      {messages.map(( {message}, index) => {
        return <p key={index}>{message}</p>;
      })}

      <div>
        <textarea rows={1} placeholder="Type your message" ref={newMessageRef}/>
        <button onClick={handleSendMessage}>send</button>
      </div>




    </Paper>
  );
}

const paperStyle: SxProps = {
  backgroundColor: '#E5F6DF',
  marginTop: '3rem',
  height: '40rem',
  width: '60rem',
  marginLeft: 'auto',
  marginRight: 'auto'
}
const header: SxProps = {
  textAlign: 'center',
  fontSize: '2.5rem',
  marginTop: '5rem'
}
const textSend: SxProps = {
  bottom: '0%',
  position: 'fixed',
  marginBottom: '2.3rem'
}
const textfield: SxProps = {
  width: '55rem'
}
const button: SxProps = {
  color: '#fff',
  background: '#4D774E '
}
const roomStyle: SxProps = {
  height: '6rem',
  width: '15rem',
  marginTop: '2rem',
  marginLeft: '1rem'
}
const roomStyle2: SxProps = {
  height: '6rem',
  width: '15rem',
  marginTop: '2rem',
  marginRight: '1rem',
  float: 'right'
}

export default Chat;