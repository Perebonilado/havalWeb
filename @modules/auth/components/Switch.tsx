import React, { FC } from "react";

import { Box, Typography } from "@mui/material";

interface Props {
  isSignup: boolean;
  isSignin: boolean;
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch: FC<Props> = ({ isSignin, isSignup, setIsSignin, setIsSignup }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        sx={{
          padding: 1.5,
          width: "50%",
          borderRight: "1px solid lightgrey",
          cursor: "pointer",
          borderBottom: isSignin ? "2px solid #1976d2" : "",
        }}
        onClick={()=>{
            setIsSignin(true)
            setIsSignup(false)
        }}
      >
        <Typography variant="h6" align="center" fontWeight={600}>
          Login
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 1.5,
          width: "50%",
          cursor: "pointer",
          borderBottom: isSignup ? "2px solid #1976d2" : "",
        }}
        onClick={()=>{
            setIsSignin(false)
            setIsSignup(true)
        }}
      >
        <Typography variant="h6" align="center" fontWeight={600}>
          Sign Up
        </Typography>
      </Box>
    </Box>
  );
};

export default Switch;
