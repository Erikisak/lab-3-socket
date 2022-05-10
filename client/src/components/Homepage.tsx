import { Paper, SxProps, Typography, TextField, Box, Button, Grid } from "@mui/material";
import { FormEvent, useState } from "react";
import { useSockets } from "../context/socket.context";


export default function Homepage() {
    const [inputValue, setinputValue] = useState('')
    const { socket, nickname, setNickname } = useSockets()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        //save nickname
        setNickname(inputValue)
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