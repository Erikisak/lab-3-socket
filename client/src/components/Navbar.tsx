import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


export default function Navbar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  sx={{ bgcolor: "#4D774E " }}>
        <Toolbar>
          <Link href='/'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <Typography sx={{ color: 'white' }}><ChatBubbleIcon/></Typography>
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}