import { Box, Button, Drawer, Grid, IconButton, Paper, SxProps, TextField, Typography } from "@mui/material";


export default function Chat() {

/*       //output message to dom, do this in chat i guess
      function outputMessage(message) {
        const div = document.createElement('div')
        div.classList.add('message')
        div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
        document.querySelector('.chat-messages').appendChild(div);
    } */

  return (
    <Paper sx={paperStyle}>
      <Typography sx={header}>
        Room 1
      </Typography>
      <Paper sx={roomStyle}>
        <Typography>
          Erik
        </Typography>
      </Paper>
      <Paper sx={roomStyle2}>
        <Typography>
          Philip
        </Typography>
      </Paper>
      <Box sx={textSend}>
        <TextField sx={textfield}>
        </TextField>
        <Button sx={button}>Send</Button>
      </Box>
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