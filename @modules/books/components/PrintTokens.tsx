import React, { FC } from "react";

import { Card, Button, Typography, Stack } from "@mui/material";

interface Props {
  tokenCount: number;
  handlePrintTokens: () => void;
}

const PrintTokens: FC<Props> = ({ tokenCount, handlePrintTokens }) => {
  return (
    <Card sx={{ padding: 2.5, width: "250px" }}>
      <Stack spacing={2}>
        <Typography align="center">{tokenCount} Tokens Generated</Typography>
        <Button variant="contained" onClick={handlePrintTokens}>
          Print Tokens
        </Button>
      </Stack>
    </Card>
  );
};

export default PrintTokens;
