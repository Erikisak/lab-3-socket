import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useSockets } from '../context/socket.context';
import LogoutIcon from '@mui/icons-material/Logout';
import Sidebar from './Sidebar';


export default function Navbar() {
  const { joinedRoom, setJoinedRoom, socket, setMessages } = useSockets();

  function exitRoom() {
    socket.emit('leaveRoom')
    setJoinedRoom(false)
    setMessages([])
  }

  return (
    <Box sx={{ flexGrow: 1, }}>
      <AppBar sx={{ bgcolor: "#4D774E " }}>
        <Toolbar>
          <Link href='/'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <Typography sx={{ color: 'white' }}><ChatBubbleIcon /></Typography>
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}>
            Chat App
          </Typography>
          {joinedRoom ?
            <IconButton
              size="large"
              type='button'
              onClick={exitRoom}
              color="inherit"
              aria-label="menu">
              <LogoutIcon />
            </IconButton> :
            null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}