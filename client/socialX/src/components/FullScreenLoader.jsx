import React from "react";
import { Box, CircularProgress, Backdrop } from "@mui/material";

import useLoadStore from "../stores/useStore";

const FullScreenLoader = () => {
    const loading = useLoadStore((state) => state.loading);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default FullScreenLoader;