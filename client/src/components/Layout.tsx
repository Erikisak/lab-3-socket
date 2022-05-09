import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';


function Layout() {
    return (
        
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#4D774E " }}>
          <Toolbar>
              <Link href='/'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            <Typography sx={{color: 'white'}}>Logo</Typography>
              
            </IconButton>
            </Link>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
       
            </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>
     
    );
  }
  
  export default Layout;