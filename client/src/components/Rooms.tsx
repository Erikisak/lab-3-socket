import { Paper, SxProps, Typography, Button, Grid, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { styled, } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';
import '../style.css'
import CreateRoom from "./CreateRoom";
import { useSockets } from "../context/socket.context";
import Chat from "./Chat";


export default function Rooms() {
    const { joinedRoom } = useSockets();

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
        !joinedRoom ?
            <Grid>
                <Button
                    onClick={handleDrawerOpen}
                    sx={{
                        ...(open && { display: 'none' }), backgroundColor: '#4D774E', color: 'white',
                        '&:hover': {
                            backgroundColor: '#4caf50',
                            color: '#fff',
                        }, marginTop: '5rem'
                    }}>
                    Rooms
                </Button>

                <CreateRoom />

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
                    {/* Stoppa rummen här */}
                    {/* {Object.keys(rooms).map((key) => {
                    return (
                        <Paper sx={roomStyle}>
                            <Link href="/Chat">
                                <Button key={key}>{key}  </Button>
                            </Link>
                        </Paper>
                    );
                })} */}
                </Drawer>
            </Grid> :
            <Chat />
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