import { Paper, SxProps, Typography, TextField, Box, Button, Grid, Drawer, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState } from "react";
import { useRef } from "react";
import { styled, } from "@mui/system";
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';
import { useSockets } from "../context/socket.context";
import EVENTS from "../config/events"
import '../style.css'


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start',
}));

const Rooms: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDeleteDrawerOpen = () => {
        setOpenDelete(true);
    };
    const handleDeleteDrawerClose = () => {
        setOpenDelete(false);
    };

    let drawerWidth
    if (!open) {
        drawerWidth = '0%'
    } else {
        drawerWidth = '100%'
    }
    let drawerHeight
    if (!open) {
        drawerHeight = '0%'
    } else {
        drawerHeight = '100%'
    }

    const { socket, roomId, rooms } = useSockets();
    const [roomName, setNewRoom] = useState('');
    

    function handleCreateRoom() {
        
        if (!String(roomName).trim()) return;

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

        setNewRoom('')
    }

    function handleJoinRoom(key: string | undefined) {
        if (key === roomId) return;
    
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
      
      }
    
    

    

    return (
       
        <Grid>
            <Button
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }), backgroundColor: '#4D774E',color: 'white',
            '&:hover': {
                backgroundColor: '#4caf50',
                color: '#fff',
            }, marginTop: '5rem' }}>
            Rooms
            </Button>
          <Typography sx={header}>
            CREATE ROOM
          </Typography>
        
        <Box textAlign={'center'}>
          <Button 
          onClick={handleDeleteDrawerOpen}
          style={{ backgroundColor: 'transparent' }}
          >
    
          <AddCircleIcon sx={icon}/>
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
                    <Typography sx={drawerText2}>
                            Room name
                        </Typography>
                   
                        <TextField className="inputRounded" value={roomName} sx={textfield} id="outlined-basic" label="Room name" variant="outlined"  required onChange={(e) => setNewRoom(e.target.value)}/>

                    <Box sx={button}>
                    <Link  variant="body2" style={{textDecoration: 'none'}}>
                    <Button sx={button2} type="submit" variant="contained" onClick={handleCreateRoom} >
                    Create
                    </Button>
                    </Link>
                    </Box>
                    <Box>
                    
                    </Box>
                </Drawer>

        <Drawer
                sx={{
                    position: 'absolute',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        marginTop: '4rem',

                        width: { xs: drawerWidth, sm: '35%', md: '25%', lg: '21%' },
                        height: { xs: drawerWidth, sm: '50%', md: '50%', lg: '80%' },
                        backgroundColor: '#9DC88D',
                       

                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon sx={iconStyle} />
                    </IconButton>
                </DrawerHeader>

                <Typography sx={drawerText}>
                    Rooms
                </Typography>

                
                
                {Object.keys(rooms).map((key) => {
                        return (
                            <Paper sx={roomStyle}>
                            <Link href="/Chat">
                            <Button key={key}>{key}  </Button> 
                            </Link>
                         
                            </Paper>
                          );
                        })}
                
            
            </Drawer>


          </Grid>
        
        
     
    );
  }

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
  const drawerText: SxProps = {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginTop: '2rem'
  }
  const iconStyle: SxProps = {
    fontSize: '2rem',
    color: 'black',
    float: 'right'
}
  const roomStyle: SxProps = {
    height: '6rem',
    marginTop: '2rem'
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
  
  export default Rooms;