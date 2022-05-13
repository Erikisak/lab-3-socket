import { Box, Button, SxProps, Typography } from "@mui/material";

export default function BadGate() {

    function refresh() {
        window.location.reload();
    }

    return (
        <Box sx={{ marginLeft: '1rem', marginRight: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: "10rem", color: { xs: 'white', sm: 'black' } }}>
            <Typography component='h3'>Something went wrong, there's nothing here!</Typography>
            <Button
                sx={ button }
                onClick={() => {
                    refresh();
                }}
            >
                Back to homepage
            </Button>
        </Box>
    )
}

const button: SxProps = {
    marginTop: '2rem',
    maxWidth: '10rem',
    backgroundColor: 'black',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5f5f5f',
      color: '#fff',
    },
  }