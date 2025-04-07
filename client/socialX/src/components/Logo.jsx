import React from "react";
import { Box, Typography } from "@mui/material";

const LinkUpLogo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height:"20vh"
      }}
    >
      {/* Chain Link Icon */}
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.59 16.34a5 5 0 0 1 0-7.07l3.53-3.53a5 5 0 0 1 7.07 7.07l-1.77 1.77"
          stroke="#007BFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.41 7.66a5 5 0 0 1 0 7.07l-3.53 3.53a5 5 0 1 1-7.07-7.07l1.77-1.77"
          stroke="#007BFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* LinkUp Text */}
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "#0A0A0A", mt: 1 }}>
        LinkUp
      </Typography>
    </Box>
  );
};

export default LinkUpLogo;