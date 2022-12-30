import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Card,
  TextField,
  Stack,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

import { toast } from "react-toastify";

import { allowNumberOnlyInput } from "../../../@shared/utils/lib";
import { useFundTokenWalletMutation } from "../../../config/features/api";
import useToken from "../../../hooks/useToken";

const FundWalletCard: FC = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<number | string>("");
  const [origin, setOrigin] = useState<string>("");
  const { token } = useToken();
  const [fundWallet, { isLoading, data, isError }] =
    useFundTokenWalletMutation();

  useEffect(() => {
    if (data) {
      toast.info("Redirecting to paystack");
      router.push(data.data.data.authorization_url);
    }
  }, [data]);

  useEffect(() => {
    if (isError) toast.error("Error Processing payment");
  }, [isError]);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <Card sx={{ padding: 2, width: "250px" }}>
      <Stack spacing={2}>
        <Typography align="center" fontWeight={500}>
          Fund Token Wallet
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ fontWeight: 600, fontSize: "20px" }}>&#8358;</span>
          <TextField
            value={amount}
            placeholder="minimum amount of 500"
            size="small"
            onChange={(e) => {
              if (allowNumberOnlyInput(e.target.value)) {
                setAmount(Number(e.target.value));
              }
            }}
          />
        </Box>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            fundWallet({
              initiator: "merchant",
              amount: Number(amount),
              token: token,
              success_url: `${origin}/wallets?wallet_fund_success=true`,
            });
          }}
          disabled={isLoading || amount < 500}
        >
          {isLoading ? <CircularProgress size={15} /> : "Authorize"}
        </Button>
      </Stack>
    </Card>
  );
};

export default FundWalletCard;
