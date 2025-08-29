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
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../axiosInstance";

const Singup = () => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [cnfPassword, setCnfPassword] = React.useState();
  const [showPass, setShowPass] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (password != cnfPassword) {
      return toast("Password and Confirm Password didn't match");
    }
    try {
      const response = await axiosInstance.post("/register", {
        username,
        email,
        password,
      });
      if (response.data.error) {
        toast.error(response.data.message);
        setLoading(false);
        return;
      }
      toast.success("SignUp successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "20px", width: "100%", textAlign: "center" }}
      >
        <LinkUpLogo />
        <Typography
          component="h1"
          variant="h5"
          align="center"
          marginTop={"10px"}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box mt={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email Address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mt={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              type={showPass ? "text" : "password"} // Toggle password visibility
              onChange={(e) => setPassword(e.target.value)}
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
          <Box mt={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Confirm Password"
              type={showPass ? "text" : "password"} // Toggle password visibility
              onChange={(e) => setCnfPassword(e.target.value)}
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Box>
        </form>
        <Button variant="outlined" fullWidth sx={{ marginTop: "8px" }}>
          <i class="fa-brands fa-google" style={{ marginRight: "5px" }}>
            {" "}
          </i>{" "}
          Sign In With Google
        </Button>
        <Typography variant="body2" sx={{ marginTop: "12px" }}>
          have an account?{" "}
          <Link
            to="/signin"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Singup
