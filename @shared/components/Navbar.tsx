import React, { FC } from "react";

import { AppBar, Typography, Toolbar, Box } from "@mui/material";

import UserCard from "./UserCard";

const Navbar: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ padding: 1 }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>Haval</Typography>
          <UserCard />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
