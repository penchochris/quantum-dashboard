import React from "react";
import Logo from "../assets/logo.svg";
import { AppBar, Box, Typography } from "@mui/material";

const Menu = () => (
  <AppBar position="static" color="primary">
    <Box display="flex" alignItems="center" p={2} gap={2}>
      <img src={Logo} alt="Logo" />
      <Box display="flex" flexDirection="column">
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          DAQS Key Manager
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Deferred Assembly Quantum-Safe Key Exchange
        </Typography>
      </Box>
    </Box>
  </AppBar>
);

export default Menu;
