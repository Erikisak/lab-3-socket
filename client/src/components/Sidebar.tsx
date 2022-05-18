import { Paper, SxProps, Typography, Button, Grid, Drawer, IconButton, Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { MouseEvent, useState } from "react";
import { styled, } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import '../style.css'
import { useSockets } from "../context/socket.context";
import { SettingsPowerSharp } from "@mui/icons-material";


export default function Sidebar() {
    const { socket, nickname, setJoinedRoom, setRoomName, roomsObject, roomsExist, setMessages } = useSockets()
    //use to render "there are no rooms" text

    //Drawer
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        if (open) {
            setOpen(false);
            return;
        } else {
            setOpen(true);
        }
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleJoinRoom(room: string) {
        setMessages([])
        setRoomName(room)
        const roomName = room
        const createRoom = false
        socket.emit('joinRoom', ({ roomName, createRoom }))
        setJoinedRoom(true)
    }

    return (

        <Box>
            <Button
                onClick={handleDrawerOpen}
                sx={{
                    backgroundColor: '#4D774E', color: 'white',
                    '&:hover': {
                        backgroundColor: '#4caf50',
                        color: '#fff',
                    },
                }}>
                Rooms
            </Button>
            <Drawer
                sx={{
                    position: 'absolute',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        marginTop: '4rem',
                        backgroundColor: '#9DC88D',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon sx={iconStyle} />
                    </IconButton>
                </DrawerHeader>
                <Typography sx={drawerText}>
                    {roomsExist ? 'Chat rooms' : 'There are no rooms'}
                </Typography>
                <List>
                    {Object.keys(roomsObject).map((key, index) => {
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton sx={button} onClick={() => handleJoinRoom(key)}>
                                    <ListItemText primary={key} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </Box >
    );
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start',
}));
const drawerText: SxProps = {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    textAlign: 'center',
    padding: '1rem',
    fontSize: '1.5rem',
    marginTop: '2rem'
}
const iconStyle: SxProps = {
    fontSize: '2rem',
    color: 'black',
    float: 'right'
}
const button: SxProps = {
    margin: '.3rem 0',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    backgroundColor: '#4D774E',
    color: 'white',
    '&:hover': {
        backgroundColor: '#4caf50',
        color: '#fff',
    },
}
const roomStyle: SxProps = {
    height: '6rem',
    marginTop: '2rem'
}
