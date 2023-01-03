import React, { FC, useState } from "react";

import { Box } from "@mui/material";

import WithdrawalForm from "./WithdrawalForm";
import VerifyOtp from "./VerifyOtp";

const Withdrawal: FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [transferCode, setTransferCode] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [isVerifyOtp, setIsVerifyOtp] = useState<boolean>();

  return (
    <Box>
      {isVerifyOtp ? (
        <VerifyOtp otp={otp} setOtp={setOtp} />
      ) : (
        <WithdrawalForm />
      )}
    </Box>
  );
};

export default Withdrawal;
