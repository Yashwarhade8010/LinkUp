import React from "react";
import {Link} from "react-router-dom"
import LinkUpLogo from "../components/Logo";
import { Container, Typography, Button, Box } from "@mui/material";

const Home = () => {
  
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      {/* Logo */}
     <LinkUpLogo/>

      {/* Headline */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to LinkUp
      </Typography>

      {/* Summary */}
      <Typography variant="h6" color="textSecondary" paragraph>
        LinkUp is a next-gen social networking platform designed to help you
        connect, engage, and grow. Whether for professional networking or
        staying in touch with friends, LinkUp provides a secure, seamless, and
        interactive experience.
      </Typography>

      {/* Call-to-Action */}
      <Link to={"/signin"}>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        sx={{ borderRadius: 3, px: 4, mt: 2 }}
      >
        Get Started
      </Button>
      </Link>
      
    </Container>
  );
};

export default Home;