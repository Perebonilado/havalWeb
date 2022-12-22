import React, { FC, PropsWithChildren } from "react";

import { Grid, Container, Box, Typography } from "@mui/material";

import NavigationBarItems from "../@shared/components/NavigationBarItems";
import UserCard from "../@shared/components/UserCard";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={2} sx={{ height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            padding: "1.5rem .5rem",
            backgroundColor: "rgba(60,60,67,.03)",
            position: "relative",
          }}
        >
          <Typography variant="h4">Haval</Typography>
          <NavigationBarItems />

          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <UserCard />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={10} sx={{ height: "100%" }}>
        <Container
          maxWidth="lg"
          sx={{
            height: "100%",
            width: "100%",
            overflowY: "scroll",
            overflowX: "hidden",
            padding: "1.5rem 2rem",
          }}
        >
          {children}
        </Container>
      </Grid>
    </Grid>
  );
};

export default Layout;
