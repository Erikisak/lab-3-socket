import { Box, Button, Paper, SxProps, TextField, Typography } from "@mui/material";
import { useSockets } from "../context/socket.context";
import { FormEvent, useState } from "react";
import Sidebar from "./Sidebar";


export default function Chat() {
  const { socket, messages, roomName, nickname, setMessages, isTyping } = useSockets()
  const [newMessage, setNewMessage] = useState('')


  //recieve messages from from all.
  socket.on('message', incomingMessage => {
    outPutMessage(incomingMessage)
  })
  //get roomname and users VG, get roomname here instead
  //socket.on('roomUsers', ({ room, users }) => {
  //  console.log(room, users)
  //})

  function outPutMessage(incomingMessage: { username: string, text: string, time: string }) {
    setMessages([
      ...messages,
      {
        username: incomingMessage.username,
        message: incomingMessage.text,
        time: incomingMessage.time
      },
    ])
    const chatBox = document.getElementById('chatBox')
    if (chatBox) {
      chatBox.scrollIntoView({ behavior: "smooth", block: "end" });
    };
  }

  const handleTyping = () => {
    socket.emit('isTyping',);
    //console.log('isTyping')
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

    <Box id='chatBox'>
      <Sidebar />
      <Paper sx={paperStyle}>
        <Typography sx={header}>{roomName}</Typography>
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', paddingBottom: '10rem' }}>

          {messages.map(({ message, username, time }, index) => {
            return (
              //conditional rendering checks if current user sent the message.
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
          {/* fix this */}
          <Typography sx={istypingText} >{isTyping}</Typography>
        </Box>
        <Box >
          <Paper sx={messageBox} component='form' elevation={5} onSubmit={handleSendMessage}>
            <TextField
              sx={textfieldStyle}
              multiline
              required
              rows={3}
              placeholder="Type your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleTyping} />
            <Button sx={button} type="submit">send</Button>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
}

const messageStyle: SxProps = {
  padding: '0.3rem 0.5rem',
}
const istypingText: SxProps = {
  marginTop: '2rem'
}
const usernameStyle: SxProps = {
  padding: '0.3rem 0.5rem',
  backgroundColor: '#4D774E',
  color: 'white',
}
const timeStyle: SxProps = {
  paddingBottom: '0.3rem',
  width: '100%',
  color: 'gray',
  textAlign: 'right'
}
const textfieldStyle: SxProps = {
  backgroundColor: 'white',
  width: '70%',
}
const messageBox: SxProps = {
  position: 'fixed',
  backgroundColor: '#E5F6DF',
  bottom: '0',
  padding: '2rem 0',
  width: '100%',
  maxWidth: '60rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  gap: '0.5rem',
}
const paperStyle: SxProps = {
  backgroundColor: '#E5F6DF',
  height: '100%',
  minHeight: '100vh',
  width: '100%',
  maxWidth: '60rem',
  marginLeft: 'auto',
  marginRight: 'auto'
}
const header: SxProps = {
  paddingTop: '2rem',
  wordWrap: 'break-word',
  textAlign: 'center',
  fontSize: '2.5rem',
}
const button: SxProps = {
  color: '#fff',
  background: '#4D774E '
}
const ownMessage: SxProps = {
  minWidth: '6rem',
  wordWrap: 'break-word',
  width: 'max-content',
  maxWidth: '20rem',
  marginTop: '1rem',
  marginLeft: '1rem',

}
const othersMessage: SxProps = {
  minWidth: '6rem',
  wordWrap: 'break-word',
  width: 'max-content',
  maxWidth: '20rem',
  marginTop: '1rem',
  marginLeft: 'auto',
  marginRight: '1rem',

}
