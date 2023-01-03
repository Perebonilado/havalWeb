import React, { FC } from "react";

import { Box } from "@mui/material";

import OtpFields from "./OtpFields";

interface Props {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}

const VerifyOtp: FC<Props> = ({otp, setOtp}) => {
  return <Box>
    <VerifyOtp otp={otp} setOtp={setOtp}/>
  </Box>;
};

export default VerifyOtp;
