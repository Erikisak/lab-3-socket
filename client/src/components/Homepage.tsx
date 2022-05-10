import { Paper, SxProps, Typography, TextField, Box, Button, Grid } from "@mui/material";
import { FormEvent, useState } from "react";
import { useSockets } from "../context/socket.context";
import '../style.css'

export default function Homepage() {
    const [inputValue, setinputValue] = useState('')
    const { socket, nickname, setNickname } = useSockets()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        //save nickname
        setNickname(inputValue)
        localStorage.setItem('nickname', inputValue)
    }

    return (
        <Grid>
            <Paper
                component='form'
                /* variant="outlined" */
                elevation={10}
                sx={paper}
                onSubmit={handleSubmit}>
                <Grid >
                    <Typography sx={headText}>
                        Enter your nickname
                    </Typography>
                </Grid>
                <TextField
                    className="inputRounded"
                    value={inputValue}
                    sx={textfield}
                    id="outlined-basic"
                    label="Nickname"
                    variant="outlined"
                    required
                    onChange={(e) => setinputValue(e.target.value)} />
                <Grid>
                    <Button type="submit" variant="contained" sx={button} >
                        Submit
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    );
}


const paper: SxProps = {
    background: '',
    marginTop: '10rem',
    height: '30rem',
    width: '20rem',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '1rem'
}
const headText: SxProps = {
    marginTop: '4rem',
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
    marginRight: 'auto',
    backgroundColor: '#4D774E',
    '&:hover': {
        backgroundColor: '#4caf50',
        color: '#fff',
    }
}