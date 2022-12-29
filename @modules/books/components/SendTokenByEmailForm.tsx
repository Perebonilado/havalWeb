import React, { FC, useEffect } from "react";

import {
  Stack,
  DialogTitle,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { FormikProvider, Form, useFormik } from "formik";

import { sendTokenViaEmailValidations } from "../../../models/book";
import { GenerateTokenData } from "../../../@types/Token";

const initialValues = {
  email: "",
};

interface Props {
  tokenEmailLoading: boolean;
  tokenData: GenerateTokenData | undefined;
  handleSendTokenEmail: ({ email }: { email: string }) => void;
  submitSuccess: boolean
}

const SendTokenByEmailForm: FC<Props> = ({
  tokenEmailLoading,
  tokenData,
  handleSendTokenEmail,
  submitSuccess
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: sendTokenViaEmailValidations,
    onSubmit: (values) => handleSendTokenEmail({ email: values.email }),
  });

  useEffect(()=>{
    if(submitSuccess) formik.resetForm()
  },[submitSuccess])
  

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={1} sx={{ padding: 2 }}>
          <CheckCircle
            sx={{
              fill: "green",
              fontSize: 40,
              display: "block",
              margin: "auto",
            }}
          />
          <DialogTitle>Token Generation Successful</DialogTitle>
          <Typography fontWeight={700} align="center" marginBottom={1}>
            {tokenData?.token}
          </Typography>

          <TextField
            label="email"
            size="small"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            variant="outlined"
            size="small"
            type="submit"
            disabled={tokenEmailLoading}
          >
            {tokenEmailLoading ? <CircularProgress size={15} /> : "Share"}
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SendTokenByEmailForm;
