import { Paper, SxProps, Typography, Button, Grid, Drawer, IconButton, Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { styled, } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import '../style.css'
import { useSockets } from "../context/socket.context";


export default function Sidebar() {
    const { socket, nickname, roomName, roomsArray, setRoomsArray } = useSockets()
    //use to render "there are no rooms" text
    const [roomsExist, setRoomsExist] = useState(false)

    //Drawer
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleJoinRoom(room: string) {
        const createRoom = false
        socket.emit('joinRoom', ({ nickname, room, createRoom }))
        console.log('test')
    }

    console.log('roomsArray: ', roomsArray)

    return (

        <Box>
            <Button
                onClick={handleDrawerOpen}
                sx={{
                    ...(open && { display: 'none' }), backgroundColor: '#4D774E', color: 'white',
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
                    Existing chat rooms
                </Typography>
                <List>
                    {roomsArray}
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
