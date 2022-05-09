import { Paper, SxProps, Typography, TextField, Box, Button, Grid } from "@mui/material";
import Link from '@mui/material/Link';
import Home from "./Home";





function Homepage() {
    return (
       
        <Grid>
        <Paper variant="outlined" elevation={10} sx={paper}>
            <Grid >
           <Typography sx={headText}>
               Enter your nickname
           </Typography>
           </Grid>
           
           <TextField sx={textfield} id="outlined-basic" label="Nickname" variant="outlined"  required/>

            <Grid>
            <Link href="/Rooms" variant="body2">
            <Button type="submit" variant="contained" sx={button} >
                Submit
            </Button>
            </Link>
            </Grid>
            

           
        </Paper>
        <Home />
        </Grid>
        
    );
     
    
  }
  
  const paper: SxProps = {
      background: '',
      marginTop: '5rem', 
      height: '30rem',
      width: '20rem',
      marginRight: 'auto',
      marginLeft: 'auto'
  }
  const headText: SxProps = {
      marginTop: '2rem',
      textAlign: 'center',
      fontSize: '1.5rem'
  }
  const textfield: SxProps = {
      marginTop: '6rem',
      display: 'flex',
      justifyContent: 'center',
      width: '12rem',
      marginLeft: 'auto',
      marginRight: 'auto'

  }
  const button: SxProps = {
      marginTop: '5rem',
      marginLeft: '7rem',
      marginRight: 'auto'

  }

  export default Homepage;