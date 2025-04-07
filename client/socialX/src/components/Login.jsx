import React, { useEffect, useState } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment, IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LinkUpLogo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import toast from "react-hot-toast";

const Login = () => {
  const [loading,setLoading] = useState(false);
  const[usernameOrEmail,setUsernameOrEmail] = useState();
  const [password,setPassword] = useState();
  const [showPass, setShowPass] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
  
  try {
    const response = await axiosInstance.post("/login", { usernameOrEmail, password });

    if (response.data.error) {
      toast.error(response.data.message);
      setLoading(false);
      return;
    }

    toast.success("Login successful!");
    navigate("/dashboard");
  } catch (err) {
    console.error("Login Error:", err);
    toast.error(err.response?.data?.message || "An error occurred");
  } finally {
    setLoading(false);
  }
  };

  const handelOauth = async () => {
    setLoading(true);
    try {
      const oauthWindow = window.open(
        "http://localhost:4000/auth/google",
        "_blank",
        "width=500,height=600"
      );
  
      const checkPopup = setInterval(() => {
        if (oauthWindow.closed) {
          clearInterval(checkPopup);
          setLoading(false);
          toast.success("Login successful");
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err) {
      toast.error("OAuth login failed");
    }
  };

  
  return (
    <Container component="main" maxWidth="xs" sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh" // Full viewport height
    }}>
      
      <Paper elevation={3} style={{ padding: "20px",width: "100%", textAlign: "center" }} >
      <LinkUpLogo/>
        <Typography component="h1" variant="h5" align="center" marginTop={"10px"}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <TextField
            onChange={(e)=>setUsernameOrEmail(e.target.value)}
              variant="outlined"
              fullWidth
              label="Email Address Or Username"
              type="text"
              required
            />
          </Box>
          <Box mt={2}>
            <TextField
            onChange={(e)=>setPassword(e.target.value)}
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
            <Button loading={loading} type="submit" variant="contained" color="primary" fullWidth >
              Sign In
            </Button>
          </Box>
        </form>
        <Button onClick={handelOauth} variant="outlined" fullWidth sx={{ marginTop: "8px" }}>
          <i class="fa-brands fa-google" style={{ marginRight: "5px" }}></i>{" "}
          Sign In With Google
        </Button>
        <Typography variant="body2" sx={{ marginTop: "12px" }}>
          Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>Sign Up</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
