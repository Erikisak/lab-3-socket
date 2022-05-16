import { SxProps, Typography, TextField, Box, Button, Drawer, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormEvent, useState } from "react";
import { styled, } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { useSockets } from "../context/socket.context";
import '../style.css'


export default function CreateRoom() {
  const { socket, nickname, setJoinedRoom, roomName, setRoomName, roomsObject } = useSockets();

  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteDrawerOpen = () => {
    setOpenDelete(true);
  };
  const handleDeleteDrawerClose = () => {
    setOpenDelete(false);
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
      socket.emit('joinRoom', { nickname, roomName, createRoom });
      setJoinedRoom(true)
    }

  }

  return (

    <Box >
      <Typography sx={header}>
        CREATE ROOM
      </Typography>
      <Box textAlign={'center'}>
        <Button
          onClick={handleDeleteDrawerOpen}
          style={{ backgroundColor: 'transparent' }}>
          <AddCircleIcon sx={icon} />
        </Button>
      </Box>
      <Drawer
        sx={drawerStyle}
        variant="persistent"
        anchor="right"
        open={openDelete}>
        <DrawerHeader >
          <IconButton onClick={handleDeleteDrawerClose}>
            <CloseIcon sx={iconStyle} />
          </IconButton>
        </DrawerHeader>
        <Box component='form' onSubmit={handleCreateRoom}>
          <Typography sx={drawerText2}>
            Room name
          </Typography>
          <TextField
            autoComplete="off"
            inputProps={{ minLength: 3 }}
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
const header: SxProps = {
  color: '#4D774E',
  textAlign: 'center',
  fontSize: '2.5rem',
  marginTop: '5rem',
}
const icon: SxProps = {
  color: '#4D774E',
  fontSize: '6rem',
  marginTop: '5rem',
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
  float: 'right'
}
const drawerText2: SxProps = {
  color: '#fff',
  textAlign: 'center',
  fontSize: '1.5rem'
}
const drawerStyle: SxProps = {
  position: 'absolute',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    marginTop: '10rem',
    marginRight: { xs: '1.5rem', sm: '8rem', lg: '20rem' },
    width: { xs: '90%', sm: '50%', md: '50%', lg: '50%' },
    height: { xs: '50%', sm: '50%', md: '40%', lg: '40%' },
    backgroundColor: '#4D774E',
    borderRadius: '20px'
  }
}
const textfield: SxProps = {

  marginTop: '4rem',
  display: 'flex',
  justifyContent: 'center',
  width: '12rem',
  marginLeft: 'auto',
  marginRight: 'auto'

}
const button: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem'
}