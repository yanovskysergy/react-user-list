import React from "react";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import Logout from "@mui/icons-material/Logout";

const Header = () => {
  return (
    <Box
      sx={{
        height: "80px",
        width: 'calc(100% - 30px)',
        backgroundColor: "lightgrey",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        padding: '0 15px 0 15px'
      }}
    >
      <Typography variant="h1" sx={{ fontSize: 50, fontWeight: 700, color: "white" }}>
        SY
      </Typography>
      <IconButton>
        <Logout sx={{ color: "#5E5E5E", fontSize: 18 }} />
      </IconButton>
    </Box>
  );
};

export default Header;
