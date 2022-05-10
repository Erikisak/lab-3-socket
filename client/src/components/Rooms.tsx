import { Paper, SxProps, Typography, TextField, Box, Button, Grid, Drawer, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from "react";
import { styled, } from "@mui/system";
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',

    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start',
}));

export default function Rooms() {

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


    return (

        <Grid>
            <Button
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }), color: '#fff' }}>
                Rooms
            </Button>
            <Typography sx={header}>
                CREATE ROOM
            </Typography>
            <Box textAlign={'center'}>
                <Button
                    onClick={handleDeleteDrawerOpen}
                >

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
                <Typography sx={drawerText2}>
                    Room name
                </Typography>
                <TextField sx={textfield} id="outlined-basic" label="Room name" variant="outlined" required />
                <Box sx={button}>
                    <Link href="/Rooms" variant="body2">
                        <Button type="submit" variant="contained"  >
                            Create
                        </Button>
                    </Link>
                </Box>
            </Drawer>
            <Drawer
                sx={{
                    position: 'absolute',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        marginTop: '4rem',
                        width: { xs: drawerWidth, sm: '35%', md: '25%', lg: '21%' },
                        height: { xs: drawerWidth, sm: '50%', md: '50%', lg: '100%' },
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
                    Rooms
                </Typography>
                <Paper sx={roomStyle}>
                    <Link href="/Chat" variant="body2">
                        <Button sx={{ color: 'black' }} type="submit" >
                            Room 1
                        </Button>
                    </Link>
                </Paper>
            </Drawer>
        </Grid>
    );
}

const header: SxProps = {
    color: '#fff',
    textAlign: 'center',
    fontSize: '2.5rem',
    marginTop: '5rem'
}
const icon: SxProps = {
    color: '#fff',
    fontSize: '6rem',
    marginTop: '5rem'
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
        backgroundColor: '#ECECEC',
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