import React, { FC, useEffect } from "react";

import { Box, Stack, Typography, Button, CircularProgress } from "@mui/material";

import { useDispatch } from "react-redux";

import useToken from "../../../hooks/useToken";
import OtpFields from "./OtpFields";
import { useFinalizeTransferMutation } from "../../../config/features/api";
import { closeDrawer } from "../../../config/features/drawer";
import { toast } from "react-toastify";

interface Props {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  transferCode: string;
}

const VerifyOtp: FC<Props> = ({
  otp,
  setOtp,
  amount,
  setAmount,
  transferCode,
}) => {
  const { token: auth_token } = useToken();

  const dispatch = useDispatch();

  const [
    finalizeTransfer,
    {
      isLoading: finalizeTransferLoading,
      data: finalizeTransferData,
      error: finalizeTransferError,
    },
  ] = useFinalizeTransferMutation();

  useEffect(() => {
    if (finalizeTransferData) {
      if (finalizeTransferData.data.status === true) {
        toast.success("Withdrawal Success");
        dispatch(closeDrawer())
      } else {
        toast.error(finalizeTransferData.data.message);
        dispatch(closeDrawer())
      }
    }
  }, [finalizeTransferData]);

  useEffect(()=>{
    if(finalizeTransferError) toast.error("Error processing Withdrawal")
  },[finalizeTransferError])

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight={600}>
          Withdrawal Form
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          Enter One Time Password
        </Typography>
        <OtpFields otp={otp} setOtp={setOtp} />
        <Button
          onClick={() => {
            finalizeTransfer({
              auth_token: auth_token,
              body: {
                amount: Number(amount),
                otp: otp,
                transfer_code: transferCode,
              },
            });
          }}
          size="small"
          variant="contained"
          disabled={otp.length < 6 || finalizeTransferLoading}
        >
          {finalizeTransferLoading ? <CircularProgress size={15}/> : "Authorize"}
        </Button>
      </Stack>
    </Box>
  );
};

export default VerifyOtp;
