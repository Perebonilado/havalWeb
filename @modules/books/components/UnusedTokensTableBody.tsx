import React, { FC, useState, useEffect } from "react";

import {
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Typography,
  CircularProgress
} from "@mui/material";

import { toast } from "react-toastify"

import { GetUnusedTokenData } from "../../../@types/Token";
import { validateEmail } from "../../../@shared/utils/lib";
import { useSendTokenViaEmailMutation } from "../../../config/features/api";

interface Props {
  data: GetUnusedTokenData[];
  auth_token: string;
  refetchTokens: Function
}

const UnusedTokensTableBody: FC<Props> = ({ data, auth_token, refetchTokens }) => {

  return (
    <TableBody>
      {data.map((item, idx) => {
        return (
          <UnusedTokenTableRow
            amount={item.amount}
            auth_token={auth_token}
            bookCoverUrl={item.book.coverImageUrl}
            bookTitle={item.book.title}
            created_at={item.created_at}
            sentTo={item.sentTo}
            token={item.token}
            refetchTokens={refetchTokens}
            key={idx}
          />
        );
      })}
    </TableBody>
  );
};

interface UnusedTokenRowProps {
  token: string;
  created_at: Date;
  amount: number;
  sentTo: string;
  bookCoverUrl: string;
  bookTitle: string;
  auth_token: string;
  refetchTokens: Function
}

const UnusedTokenTableRow: FC<UnusedTokenRowProps> = ({
  token,
  created_at,
  amount,
  sentTo,
  bookCoverUrl,
  bookTitle,
  auth_token,
  refetchTokens
}) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [
    sendTokenEmail,
    {
      data: tokenEmailData,
      isLoading: tokenEmailLoading,
      isError: isTokenEmailError,
      error: tokenEmailError,
      isSuccess: tokenEmailSuccess,
    },
  ] = useSendTokenViaEmailMutation();

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError(true);
    } else setEmailError(false);
  }, [email]);

  useEffect(()=>{
    if(tokenEmailSuccess) {
      toast.success("Email successfully sent")
      refetchTokens()
    }
  },[tokenEmailSuccess])

  useEffect(()=>{
     if(tokenEmailError) toast.error("Error sending email")
  },[tokenEmailError])

  return (
    <TableRow>
      <TableCell>
        <Typography>{token}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{new Date(created_at).toDateString()}</Typography>
      </TableCell>
      <TableCell>
        <Typography>
          <span>&#8358;</span>
          {amount}
        </Typography>
      </TableCell>
      <TableCell>
        {sentTo ? (
          <Typography>{sentTo}</Typography>
        ) : (
          <TextField
            size={"small"}
            label={"Email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            helperText={emailError && "Please Enter a valid email address"}
            error={emailError}
          />
        )}
      </TableCell>
      <TableCell>
        {sentTo ? (
          <Button
            size="small"
            onClick={() => {
              sendTokenEmail({
                assetImage: bookCoverUrl,
                assetName: bookTitle,
                email: sentTo,
                token: token,
                auth_token: auth_token,
              });
            }}
          >
            {tokenEmailLoading ? <CircularProgress size={15}/> : "Resend Email"}
          </Button>
        ) : (
          <Button
            size="small"
            disabled={!email || emailError}
            onClick={() => {
              sendTokenEmail({
                assetImage: bookCoverUrl,
                assetName: bookTitle,
                email: email,
                token: token,
                auth_token: auth_token,
              });
            }}
          >
            {tokenEmailLoading ? <CircularProgress size={15}/> : "Send Email"}
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UnusedTokensTableBody;
