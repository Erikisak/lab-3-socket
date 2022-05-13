import { Box, Button, Paper, SxProps, TextField, Typography } from "@mui/material";
import { useSockets } from "../context/socket.context";
import { FormEvent, useState } from "react";



 

export default function Chat() {
  const { socket, messages, roomName, nickname, setMessages, isTyping} = useSockets()
  const [newMessage, setNewMessage] = useState('')


  //recieve messages from from all. This isnt great, recieves duplicates, try to fix.
  socket.on('message', incomingMessage => {
    outPutMessage(incomingMessage)
    console.log(incomingMessage)
  })
  //get roomname and users
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
    ]);
  }

  const handleTyping = (e: any) => {
    socket.emit('isTyping', );

    console.log('isTyping')
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
      <Paper sx={paperStyle}>
        <Typography sx={header}>{roomName}</Typography>
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', paddingBottom: '10rem' }}>
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
        <Box >
        <Typography sx={istyping}>{isTyping}</Typography>
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
      
  );
}

const messageStyle: SxProps = {
  padding: '0.3rem 0.5rem',
}
const istyping: SxProps = {
  height: '2rem',
  minWidth: '8rem',
  float: 'right',
  marginRight: '1rem',
  marginTop: '5rem',
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
const roomname: SxProps = {
  textAlign: 'center',
  fontSize: '2rem',
  paddingTop: '2rem'

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
  minWidth: '6rem',
  wordWrap: 'break-word',
  width: 'max-content',
  maxWidth: '20rem',
  marginTop: '1rem',
  marginLeft: '1rem'
}
const othersMessage: SxProps = {
  minWidth: '6rem',
  wordWrap: 'break-word',
  width: 'max-content',
  maxWidth: '20rem',
  marginTop: '1rem',
  marginLeft: 'auto',
  marginRight: '1rem'
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