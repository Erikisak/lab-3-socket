import { Box, Button, Paper, SxProps, TextField, Typography } from "@mui/material";
import { useSockets } from "../context/socket.context";
import { FormEvent, useState } from "react";



export default function Chat() {
  const { socket, messages, roomName, nickname, setMessages } = useSockets()
  const [newMessage, setNewMessage] = useState('')


  //recieve messages from from all. This isnt great, recieves duplicates, try to fix.
  socket.on('message', incomingMessage => {
    outPutMessage(incomingMessage)
  })
  //get roomname and users
  //socket.on('roomUsers', ({ room, users }) => {
  //})

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
    <Box>
      <Paper sx={paperStyle}>
        <Typography sx={header}>{roomName}</Typography>
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
          {messages.map(({ message, username, time }, index) => {
            return (
              //conditional rendering checks if current user sent the message. Fix styling.
              username === nickname ?
                <Paper sx={ownMessage} key={index}>
                  <Typography sx={usernameStyle}>You</Typography>
                  <Typography sx={messageStyle}>{message}</Typography>
                  <Typography sx={timeStyle}>{time}</Typography>
                </Paper>
                :
                <Paper sx={othersMessage} key={index}>
                  <Typography sx={usernameStyle}>{username}</Typography>
                  <Typography sx={messageStyle}>{message}</Typography>
                  <Typography sx={timeStyle}>{time}</Typography>
                </Paper>
            )
          })}
        </Box>
        <Box sx={messageBox} component='form' onSubmit={handleSendMessage}>
          <TextField
            sx={textfieldStyle}
            multiline
            required
            rows={3}
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} />
          <Button sx={button} type="submit">send</Button>
        </Box>
      </Paper>
    </Box>
  );
}

const messageStyle: SxProps = {}
const usernameStyle: SxProps = {}
const timeStyle: SxProps = {}
const textfieldStyle: SxProps = {
  backgroundColor: 'white',
  width: '70%',
}
const roomname: SxProps = {
  textAlign: 'center',
  fontSize: '2rem',
  paddingTop: '2rem'

}
const messageBox: SxProps = {
  bottom: '0',
  width: '100%',
  maxWidth: '60rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
const paperStyle: SxProps = {
  backgroundColor: '#E5F6DF',
  marginTop: '6rem',
  minHeight: '40rem',
  height: '100%',
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
const chatBubble: SxProps = {
  backgroundColor: 'white',
  width: '10rem',
  height: '5rem',
  paddingTop: '.5rem',
  paddingLeft: '.5rem',
  marginLeft: '1rem',
  marginTop: '2rem',
  marginBottom: '2rem'
}