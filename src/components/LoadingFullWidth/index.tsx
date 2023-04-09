import { Box, CircularProgress } from "@mui/material";
import React from "react";

function LoadingFullWidth() {
  return (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <CircularProgress />
  </Box>
  );
}

export default LoadingFullWidth;