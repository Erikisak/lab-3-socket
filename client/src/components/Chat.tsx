import { Box, Button, Drawer, Grid, IconButton, Paper, SxProps, TextField, Typography } from "@mui/material";
import { useSockets } from "../context/socket.context";
import { FormEvent, useState } from "react";


export default function Chat() {
  const {socket, messages, roomName, nickname, setMessages} = useSockets ()
  const [newMessage, setNewMessage] = useState('')

  function handleSendMessage(e: FormEvent) {
    e.preventDefault()
    const message = newMessage

    if (!String(message).trim()) {
      return;
    }

    //sends message roomname and nickname to server
    socket.emit('chatMessage', {roomName, message, nickname})

    setMessages([
      ...messages,
      {
        nickname: "you",
        message,
      },
    ]);

    setNewMessage('')
  }

  return ( 
    <Paper sx={paperStyle}>
      <Typography>{roomName}</Typography>

      {messages.map(( {message}, index) => {
        return <Typography key={index}>{message}</Typography>;
      })}

      <Box sx={messageBox} component='form' onSubmit={handleSendMessage}>
        <TextField
        sx={textfieldStyle}
        multiline
        maxRows={3}
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

//  export default Chat;

//   output message to dom, do this in chat i guess
//          function outputMessage(message) {
//           const div = document.createElement('div')
//           div.classList.add('message')
//           div.innerHTML = `
//       <p class="meta">${message.username} <span>${message.time}</span></p>
//       <p class="text">
//           ${message.text}
//       </p>`;
//           document.querySelector('.chat-messages').appendChild(div);
//       } 


      
//   return (
//     <Paper sx={paperStyle}>
//       <Typography sx={header}>
//         {roomName}
//       </Typography>
//       <Paper sx={roomStyle}>
//         <Typography>
//           Erik
//         </Typography>
//       </Paper>
//       <Paper sx={roomStyle2}>
//         <Typography>
//           Philip
//         </Typography>
//       </Paper>
//       <Box sx={textSend}>
//         <TextField sx={textfield}>
//         </TextField>
//         <Button sx={button}>Send</Button>
//       </Box>
//     </Paper>
//   );
// }

// const paperStyle: SxProps = {
//   backgroundColor: '#E5F6DF',
//   marginTop: '3rem',
//   height: '40rem',
//   width: '100%',
//   maxWidth: '60rem',
//   marginLeft: 'auto',
//   marginRight: 'auto'
// }
// const header: SxProps = {
//   textAlign: 'center',
//   fontSize: '2.5rem',
//   marginTop: '5rem'
// }
// const textSend: SxProps = {
//   bottom: '0%',
//   position: 'fixed',
//   marginBottom: '2.3rem'
// }
// const textfield: SxProps = {
//   width: '55rem'
// }
// const button: SxProps = {
//   color: '#fff',
//   background: '#4D774E '
// }
// const roomStyle: SxProps = {
//   height: '6rem',
//   width: '15rem',
//   marginTop: '2rem',
//   marginLeft: '1rem'
// }
// const roomStyle2: SxProps = {
//   height: '6rem',
//   width: '15rem',
//   marginTop: '2rem',
//   marginRight: '1rem',
//   float: 'right'
// }