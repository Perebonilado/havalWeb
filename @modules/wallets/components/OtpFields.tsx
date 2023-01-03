import React, { FC, useState } from "react";

import { Box } from "@mui/material";

import OtpInput from "react-otp-input";

const otpStyles = {
  padding: ".5rem",
  outline: "none",
  width: "35px",
  height: "35px",
  border: "1px solid #7B7B7B63",
  borderRadius: "8px",
};

interface Props {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}

const OtpFields: FC<Props> = ({ otp, setOtp }) => {
  return (
    <OtpInput
      value={otp}
      onChange={(value: string) => setOtp(value)}
      numInputs={6}
      separator={<Box sx={{ padding: "0 .5rem" }}></Box>}
      inputStyle={{ ...otpStyles }}
    />
  );
};

export default OtpFields;
