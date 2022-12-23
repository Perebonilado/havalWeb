import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, TextField, Button, CircularProgress } from "@mui/material";

import { useFormik, FormikProvider, Form } from "formik";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { signupValidation } from "../../../models/auth";
import { useSignupMutation } from "../../../config/features/api";
import { AUTH_TOKEN } from "../../../@shared/constants";

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
};

const SignupForm: FC = () => {
  const [signup, { isLoading, data, isSuccess, error }] = useSignupMutation();
  const [isPasswordConfirmPasswordError, setIsConfirmPasswordError] =
    useState<boolean>(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");

  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signupValidation,
    onSubmit: (values) => handleSubmit({ values }),
  });

  const handleSubmit = ({ values }: { values: typeof initialValues }) => {
    signup({ ...values, isMerchant: true });
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Account successfully created!");
      Cookies.set(`${AUTH_TOKEN}`, data.token);
      router.push("/")
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      const { data }: any = error;
      toast.error(data?.message);
    }
  }, [error]);

  useEffect(() => {
    if (
      confirmPasswordValue &&
      confirmPasswordValue !== formik.values.password
    ) {
      setIsConfirmPasswordError(true);
    } else setIsConfirmPasswordError(false);
  }, [confirmPasswordValue, formik.values.password]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            paddingTop: 4,
          }}
        >
          <Box>
            <TextField
              required={true}
              label="First name"
              size="small"
              type={"First name"}
              fullWidth
              {...formik.getFieldProps("firstName")}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Box>

          <Box>
            <TextField
              required={true}
              label="Last name"
              size="small"
              type={"Last name"}
              fullWidth
              {...formik.getFieldProps("lastName")}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Box>

          <Box>
            <TextField
              required={true}
              label="Username"
              size="small"
              fullWidth
              {...formik.getFieldProps("username")}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Box>

          <Box>
            <TextField
              required={true}
              label="Email"
              size="small"
              type={"email"}
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>

          <Box>
            <TextField
              required={true}
              label="Password"
              type={"password"}
              size="small"
              fullWidth
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>

          <Box>
            <TextField
              required={true}
              label="Confirm Password"
              type={"password"}
              size="small"
              fullWidth
              error={isPasswordConfirmPasswordError}
              value={confirmPasswordValue}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
              helperText={
                isPasswordConfirmPasswordError && "Passwords do not match"
              }
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              size="small"
              sx={{ margin: "auto", display: "block" }}
              type="submit"
              disabled={isLoading || isPasswordConfirmPasswordError}
            >
              {isLoading ? <CircularProgress size={20} /> : "Sign up"}
            </Button>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
