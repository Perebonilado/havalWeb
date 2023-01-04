import React, { FC, useState } from "react";

import { Box } from "@mui/material";

import WithdrawalForm from "./WithdrawalForm";
import VerifyOtp from "./VerifyOtp";

const Withdrawal: FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [transferCode, setTransferCode] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isVerifyOtp, setIsVerifyOtp] = useState<boolean>(false);

  return (
    <Box>
      {isVerifyOtp ? (
        <VerifyOtp
          otp={otp}
          setOtp={setOtp}
          amount={amount}
          setAmount={setAmount}
          transferCode={transferCode}
        />
      ) : (
        <WithdrawalForm
          amount={amount}
          setAmount={setAmount}
          setIsVerifyOtp={setIsVerifyOtp}
          setTransferCode={setTransferCode}
        />
      )}
    </Box>
  );
};

export default Withdrawal;
