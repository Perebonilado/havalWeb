import React, { FC, useState, useEffect } from "react";

import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";

import { toast } from "react-toastify";

import useToken from "../../../hooks/useToken";
import {
  useGetBanksListQuery,
  useVerifyBankAccountNumberQuery,
  useCreateTransferRecipientMutation,
  useInitiateTransferMutation,
} from "../../../config/features/api";
import { allowNumberOnlyInput } from "../../../@shared/utils/lib";
import { maxNubanDigits } from "../utils/constants";

interface Props {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setIsVerifyOtp: React.Dispatch<React.SetStateAction<boolean>>;
  setTransferCode: React.Dispatch<React.SetStateAction<string>>;
}

const WithdrawalForm: FC<Props> = ({
  amount,
  setAmount,
  setIsVerifyOtp,
  setTransferCode,
}) => {
  const { token: auth_token } = useToken();
  const { data: banks, isLoading: banksLoading } = useGetBanksListQuery(
    { auth_token: auth_token },
    { skip: !auth_token }
  );
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [bankCode, setBankCode] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [isVerifyAccount, setIsVerifyAccount] = useState<boolean>(false);
  const [submitFormLoading, setSubmitFormLoading] = useState<boolean>(false);

  const { data: accountDetails } = useVerifyBankAccountNumberQuery(
    {
      account_number: accountNumber,
      bank_code: bankCode,
      auth_token: auth_token,
    },
    {
      skip: !auth_token || !isVerifyAccount,
      refetchOnMountOrArgChange: true,
    }
  );

  const [
    createTransRec,
    { data: createTransRecData, error: createTransRecError },
  ] = useCreateTransferRecipientMutation();
  const [
    initiateTransfer,
    { data: initiateTransferData, error: initiateTransferError },
  ] = useInitiateTransferMutation();

  useEffect(() => {
    if (createTransRecData && createTransRecData.data.status === true) {
      if (createTransRecData.data.status === true) {
        initiateTransfer({
          auth_token: auth_token,
          body: {
            amount: Number(amount),
            reason: "Withdrawal from revenue wallet",
            recipient: createTransRecData.data.data.recipient_code,
          },
        });
      } else {
        setSubmitFormLoading(false);
        toast.error(createTransRecData?.data.message);
      }
    }
  }, [createTransRecData]);

  useEffect(() => {
    if (createTransRecError) {
      setSubmitFormLoading(false);
      const { data }: any = createTransRecError;
      toast.error(data?.message);
    }
  }, [createTransRecError]);

  useEffect(() => {
    if (initiateTransferError) {
      setSubmitFormLoading(false);
      const { data }: any = initiateTransferError;
      toast.error(data?.message);
    }
  }, [initiateTransferError]);

  useEffect(() => {
    if (initiateTransferData) {
      if (initiateTransferData.data.status === true) {
        setTransferCode(initiateTransferData.data.data.transfer_code);
        setSubmitFormLoading(false);
        setIsVerifyOtp(true);
      } else {
        setSubmitFormLoading(false);
        toast.error(initiateTransferData?.data.message);
      }
    }
  }, [initiateTransferData]);

  useEffect(() => {
    if (accountNumber && accountNumber.length === maxNubanDigits) {
      setIsVerifyAccount(true);
    } else {
      setIsVerifyAccount(false);
      setAccountName("");
    }
  }, [accountNumber]);

  useEffect(() => {
    if (accountDetails?.data) {
      setAccountName(accountDetails.data.account_name);
    }
  }, [accountDetails]);

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight={600}>
          Withdrawal Form
        </Typography>

        <TextField
          disabled={banksLoading}
          select
          size={"small"}
          variant="standard"
          label="Select Bank"
          fullWidth
          value={selectedBank}
          onChange={(e) => {
            const bank_code = banks?.data.filter(
              (item) => item.name === e.target.value
            )[0].code;
            if (bank_code) setBankCode(bank_code);
            setSelectedBank(e.target.value);
          }}
        >
          {banks?.data.map((item) => {
            return (
              <MenuItem value={item.name} key={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </TextField>

        <TextField
          disabled={!selectedBank}
          size={"small"}
          variant="standard"
          label="Account Number"
          fullWidth
          value={accountNumber}
          onChange={(e) => {
            if (
              allowNumberOnlyInput(e.target.value) &&
              e.target.value.length <= maxNubanDigits
            ) {
              setAccountNumber(e.target.value);
            }
          }}
        />

        {accountName && (
          <TextField
            size={"small"}
            variant="standard"
            label="Account Name"
            fullWidth
            disabled={true}
            value={accountName}
          />
        )}

        <TextField
          size={"small"}
          variant="standard"
          label="Amount"
          fullWidth
          value={amount}
          onChange={(e) => {
            if (allowNumberOnlyInput(e.target.value)) {
              setAmount(e.target.value);
            }
          }}
        />

        <Button
          variant="contained"
          size="small"
          disabled={!accountName || !amount || submitFormLoading}
          onClick={() => {
            createTransRec({
              auth_token: auth_token,
              body: {
                account_number: accountNumber,
                bank_code: bankCode,
                name: accountName,
              },
            });
            setSubmitFormLoading(true);
          }}
        >
          {submitFormLoading ? <CircularProgress size={15} /> : "Withdraw"}
        </Button>
      </Stack>
    </Box>
  );
};

export default WithdrawalForm;
