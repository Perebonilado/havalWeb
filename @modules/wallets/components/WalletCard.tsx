import React, { FC } from "react";

import { Card, Typography, Stack, Button } from "@mui/material";


import { formatNumberToHaveCommas } from "../../../@shared/utils/lib"

interface Props {
  title: string;
  bgColor: string;
  amount: number;
  buttonText: string;
  handleWalletAction?: () => void;
}

const WalletCard: FC<Props> = ({
  title,
  bgColor,
  amount,
  buttonText,
  handleWalletAction,
}) => {
  return (
    <Card
      sx={{
        width: "250px",
        height: "150px",
        padding: 1.5,
        cursor: "pointer",
        background: bgColor,
      }}
    >
      <Stack spacing={2}>
        <Typography fontWeight={600} sx={{ color: "#fff" }}>
          {title}
        </Typography>
        <Typography fontWeight={600} sx={{ color: "#fff" }}>
          Balance: <>&#8358;</>
          {formatNumberToHaveCommas(String(amount))}
        </Typography>
        <Button
          onClick={handleWalletAction}
          variant="outlined"
          sx={{
            color: "#000",
            borderColor: "#fff",
            bgcolor: "#fff",
            "&:hover": {
              backgroundColor: "#fff",
              borderColor: "#fff",
            },
          }}
        >
          {buttonText}
        </Button>
      </Stack>
    </Card>
  );
};

export default WalletCard;
