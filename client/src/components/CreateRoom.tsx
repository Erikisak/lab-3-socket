import { SxProps, Typography, TextField, Box, Button, Drawer, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormEvent, useState } from "react";
import { styled, } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { useSockets } from "../context/socket.context";
import '../style.css'


export default function CreateRoom() {
  const { socket, nickname, setJoinedRoom, roomName, setRoomName, roomsObject } = useSockets();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleCreateRoom(e: FormEvent) {
    e.preventDefault()
    let doubleCheck = Object.keys(roomsObject).filter((key) => key === roomName)

    if (!String(roomName).trim()) {
      alert('The name of a room can not be blank')
      return;
    } else if (doubleCheck.length > 0) {
      alert('This name is taken')
      return;
    }
    else {
      const createRoom = true

      //join chatroom, send username and room to server || FUNKAR
      socket.emit('joinRoom', { roomName, createRoom });
      setJoinedRoom(true)
    }

  }

  return (

    <Box sx={middle}>
      <Typography sx={welcome}>
        {nickname}, welcome to Chat App!
      </Typography>

      <Box sx={createRoomStyle}>
        <Typography sx={header}>
          CREATE ROOM
        </Typography>
        <Button onClick={handleDrawerOpen}>
          <AddCircleIcon sx={icon} />
        </Button>
      </Box>
      <Drawer
        PaperProps={{ sx: { width: 'max-content', padding: '1rem', margin: '0 auto' } }}
        sx={drawerStyle}
        variant="temporary"
        anchor="top"
        open={open}>
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon sx={iconStyle} />
          </IconButton>
        </DrawerHeader>
          <Typography sx={drawerText2}>
            Your room name
          </Typography>
        <Box component='form' onSubmit={handleCreateRoom}>
          <TextField
            autoComplete="off"
            inputProps={{ minLength: 3, maxLength: 20 }}
            className="inputRounded"
            value={roomName}
            sx={textfield}
            id="outlined-basic"
            label="Room name"
            variant="outlined"
            required
            onChange={(e) => setRoomName(e.target.value)} />
          <Box sx={button}>
            <Button
              sx={button2}
              type="submit"
              variant="contained" >
              Create
            </Button>
          </Box>
        </Box>
        <Box>
        </Box>
      </Drawer>
    </Box>
  );
}


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-start',
}));
const middle: SxProps = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
}
const createRoomStyle: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
}
const header: SxProps = {
  color: '#4D774E',
  textAlign: 'center',
  fontSize: '2.5rem',
}
const welcome: SxProps = {
  color: '#4D774E',
  position: 'absolute',
  fontSize: '1.5rem',
  paddingTop: '5rem',
}
const icon: SxProps = {
  color: '#4D774E',
  fontSize: '6rem',
  paddingTop: '1rem',
  '&:hover': {
    color: '#4caf50',
  },
}
const button2: SxProps = {
  backgroundColor: '#030b07',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
}
const iconStyle: SxProps = {
  fontSize: '2rem',
  color: 'black',
}
const drawerText2: SxProps = {
  color: '#fff',
  fontSize: '1.5rem'
}
const drawerStyle: SxProps = {
  textAlign: 'center',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    marginTop: '10rem',
    backgroundColor: '#4D774E',
    borderRadius: '20px'
  }
}
const textfield: SxProps = {
  marginTop: '3rem',
  width: '15rem',
}
const button: SxProps = {
  marginTop: '2rem'
}