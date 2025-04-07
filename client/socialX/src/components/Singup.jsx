import React from 'react'
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    InputAdornment, IconButton
  } from '@mui/material';
  import { Visibility, VisibilityOff } from "@mui/icons-material";
import LinkUpLogo from './Logo';
import { Link } from 'react-router-dom';

const Singup = () => {
    const [showPass, setShowPass] = React.useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle sign-in logic here
        console.log('Sign-in form submitted');
      };
  return (
    <Container component="main" maxWidth="xs" sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <Paper elevation={3} style={{ padding: '20px',width: "100%", textAlign: "center" }}>
        <LinkUpLogo/>
        <Typography component="h1" variant="h5" align="center" marginTop={"10px"}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
        <Box mt={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Username"
              type="text"
              required
            />
          </Box>
          <Box mt={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email Address"
              type="email"
              required
            />
          </Box>
          <Box mt={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              type={showPass ? "text" : "password"} // Toggle password visibility
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign In
            </Button>
          </Box>
        </form>
       <Button variant="outlined" fullWidth sx={{marginTop:"8px"}}><i class="fa-brands fa-google" style={{marginRight:"5px"}}> </i> Sign In With Google</Button>
       <Typography variant="body2" sx={{ marginTop: "12px" }}>
          have an account? <Link to="/signin" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>Sign In</Link>
        </Typography>
      </Paper>
    </Container>
  )
}

export default Singup
