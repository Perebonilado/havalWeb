import React, { FC } from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Card,
} from "@mui/material";

interface Props {
  tokenCount: number;
  tokenGenerationLoading: boolean;
  setTokenCount: React.Dispatch<React.SetStateAction<number>>;
  handleGenerateToken: () => void;
}

const TokenCounter: FC<Props> = ({
  tokenCount,
  handleGenerateToken,
  setTokenCount,
  tokenGenerationLoading,
}) => {
  return (
    <Card sx={{ padding: 2.5 }}>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight={500}>
          How many tokens do you wish to generate?
        </Typography>
        <TextField
          placeholder="Enter value"
          size="small"
          value={tokenCount}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setTokenCount(Number(e.target.value));
            }
          }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={handleGenerateToken}
          disabled={tokenGenerationLoading}
        >
          {tokenGenerationLoading ? <CircularProgress size={15} /> : "Proceed"}
        </Button>
      </Stack>
    </Card>
  );
};

export default TokenCounter;
