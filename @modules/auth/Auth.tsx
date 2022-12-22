import React, { FC, useState } from "react";

import { Box } from "@mui/material";

import Switch from "./components/Switch";
import SignInForm from "./components/SignInForm";
import SignupForm from "./components/SignupForm";

const Auth: FC = () => {
  const [isSignin, setIsSignin] = useState<boolean>(true);
  const [isSignup, setIsSignup] = useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(to right bottom, #1976d2, #7894dd, #aeb5e8, #d9d9f3, #ffffff)",
          width: "100vw",
          height: "100vh",
          padding: "50px 15px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            minHeight: "40vh",
            maxHeight: "75vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            borderRadius: "20px",
          }}
        >
          <Switch
            isSignin={isSignin}
            isSignup={isSignup}
            setIsSignin={setIsSignin}
            setIsSignup={setIsSignup}
          />
          {
            isSignin ? <SignInForm /> : <SignupForm />
          }
        </Box>
      </Box>
    </>
  );
};

export default Auth;
