import { Box, Button, Drawer, Grid, IconButton, Paper, SxProps, TextField, Typography } from "@mui/material";
import { useSockets } from "../context/socket.context";
import { FormEvent, useEffect, useState } from "react";


export default function Chat() {
  const { socket, messages, roomName, nickname, setMessages } = useSockets()
  const [newMessage, setNewMessage] = useState('')


  //recieve messages from from all
  socket.on('message', incomingMessage => {
    console.log(incomingMessage)
    outPutMessage(incomingMessage)
  })
  //get roomname and users
  socket.on('roomUsers', ({ room, users }) => {
    console.log(room, users)
  })

  function outPutMessage(incomingMessage: { username: string, text: string, time: string }) {
    setMessages([
      ...messages,
      {
        username: incomingMessage.username,
        message: incomingMessage.text,
        time: incomingMessage.time
      },
    ]);
  }

  console.log(messages)

  function handleSendMessage(e: FormEvent) {
    e.preventDefault()
    const text = newMessage

    if (!String(text).trim()) {
      return;
    }

    socket.emit('chatMessage', text)

    setNewMessage('')
  }

  return (
    <Paper sx={paperStyle}>
      <Typography sx={header}>{roomName}</Typography>


      <Box sx={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        {messages.map(({ message, username, time }, index) => {
          return (
            //conditional rendering checks if current user sent the message. Fix styling.
            username === nickname ?
              <Paper sx={ownMessage} key={index}>
                <Typography >You</Typography>
                <Typography >{message}</Typography>
                <Typography >{time}</Typography>
              </Paper>
              :
              <Paper sx={othersMessage} key={index}>
                <Typography >{username}</Typography>
                <Typography >{message}</Typography>
                <Typography >{time}</Typography>
              </Paper>
          )
        })}
      </Box>

      <Box sx={messageBox} component='form' onSubmit={handleSendMessage}>
        <TextField
          sx={textfieldStyle}
          multiline
          rows={3}
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} />
        <Button sx={button} type="submit">send</Button>
      </Box>
    </Paper>
  );
}

const textfieldStyle: SxProps = {
  backgroundColor: 'white',
  width: '70%'
}
const messageBox: SxProps = {
  position: 'absolute',
  zIndex: '2',
  width: '100%',
  maxWidth: '60rem',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
const paperStyle: SxProps = {
  backgroundColor: '#E5F6DF',
  marginTop: '6rem',
  height: '40rem',
  width: '100%',
  maxWidth: '60rem',
  marginLeft: 'auto',
  marginRight: 'auto'
}
const header: SxProps = {
  textAlign: 'center',
  fontSize: '2.5rem',
  marginTop: '5rem'
}
const button: SxProps = {
  color: '#fff',
  background: '#4D774E '
}
const ownMessage: SxProps = {
  width: 'min-content',
  padding: '0.3rem 1rem',
  marginTop: '1rem',
  marginLeft: '1rem'
}
const othersMessage: SxProps = {
  width: 'min-content',
  padding: '0.3rem 1rem',
  marginTop: '1rem',
  right: '1rem',
}