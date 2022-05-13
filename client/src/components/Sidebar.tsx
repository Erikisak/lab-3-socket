import { Paper, SxProps, Typography, Button, Grid, Drawer, IconButton, Box } from "@mui/material";
import { useState } from "react";
import { styled, } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import '../style.css'
import { useSockets } from "../context/socket.context";


export default function Sidebar() {
    const { roomName } = useSockets()

    //Drawer
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    /* function handleJoinRoom(key: string | undefined) {
        if (key === roomId) return;
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
    } */


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
                <Paper sx={roomStyle}>
                    <Button>{roomName}</Button>
                </Paper>
            </Drawer>
        </Box>
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
