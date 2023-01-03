import React, { FC } from "react";

import { Box, TextField, MenuItem, Typography, Stack } from "@mui/material";

import useToken from "../../../hooks/useToken";
import { useGetBanksListQuery } from "../../../config/features/api";

const WithdrawalForm: FC = () => {
  const { token: auth_token } = useToken();
  const { data: banks, isLoading: banksLoading } = useGetBanksListQuery(
    { auth_token: auth_token },
    { skip: !auth_token }
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight={600}>
          Withdrawal Form
        </Typography>

        <TextField select size={"small"} variant="standard" label="Select Bank" fullWidth>
          {banks?.data.map((item) => {
            return <MenuItem key={item.id}>{item.name}</MenuItem>;
          })}
        </TextField>
      </Stack>
    </Box>
  );
};

export default WithdrawalForm;
