import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";

import { Box, TextField, Button, CircularProgress } from "@mui/material";

import { useFormik, FormikProvider, Form } from "formik";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { loginValidation } from "../../../models/auth";
import { useLoginMutation } from "../../../config/features/api";
import { AUTH_TOKEN } from "../../../@shared/constants";

const initialValues = {
  email: "",
  password: "",
};

const SignInForm: FC = () => {

  const [login, { isLoading, data, error, isSuccess }] = useLoginMutation();

  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: (values) => handleSubmit({ values: values }),
  });

  const handleSubmit = ({ values }: { values: typeof initialValues }) => {
    login(values);
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Login Successful");
      Cookies.set(`${AUTH_TOKEN}`, data.token, { expires: 1 });
      router.push("/")
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      const { data }: any = error;
      toast.error(data?.message);
    }
  }, [error]);

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
              helperText={formik.touched.password && formik.errors.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              size="small"
              sx={{ margin: "auto", display: "block" }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={20} /> : "Login"}
            </Button>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default SignInForm;
