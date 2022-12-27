import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Grid,
  Button,
  CircularProgress,
  Typography,
  Stack,
  Rating,
  DialogTitle,
  TextField,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { toast } from "react-toastify";
import { useFormik, Form, FormikProvider } from "formik";

import {
  useGetBookByIdQuery,
  useGenerateSalesTokenMutation,
  useSendTokenViaEmailMutation,
} from "../../../config/features/api";
import useToken from "../../../hooks/useToken";
import Bookcover from "./Bookcover";
import Modal from "../../../@shared/components/Modal";
import { sendTokenViaEmailValidations } from "../../../models/book";
import { SendTokenViaEmailPayload } from "../../../@types/Token"

const initialValues = {
  email: "",
};

const SpecificBookDetails: FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { token } = useToken();
  const { data, isSuccess, isError, refetch, error, isLoading } =
    useGetBookByIdQuery(
      { token: token, id: `${String(id)}` },
      {
        skip: !token || !id,
        refetchOnReconnect: true,
      }
    );
  const [
    generateSalesToken,
    {
      data: tokenData,
      isLoading: salesTokenLoading,
      isError: isSalesTokenError,
      error: salesTokenError,
      isSuccess: isSalesTokenSuccess,
    },
  ] = useGenerateSalesTokenMutation();
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: sendTokenViaEmailValidations,
    onSubmit: (values) => handleSendTokenEmail({ email: values.email }),
  });

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const handleSendTokenEmail = ({ email }: { email: string }) => {
    if (tokenData && token && data) {
      const body:SendTokenViaEmailPayload = {
        assetName: tokenData.data.bookTitle,
        email: email,
        token: tokenData.data.token,
        auth_token: token,
        assetImage: data.data[0].coverImageUrl
      };
      sendTokenEmail(body);
    }
  };

  useEffect(() => {
    if (tokenEmailSuccess) {
      handleCloseModal();
      toast.success("Email sent successfully");
      formik.resetForm();
    }
  }, [tokenEmailSuccess]);

  useEffect(() => {
    if (salesTokenError) {
      const { data }: any = salesTokenError;
      toast.error(data?.message);
    }
  }, [salesTokenError]);

  useEffect(() => {
    if (isSalesTokenSuccess) {
      setIsModal(true);
      refetch();
    }
  }, [isSalesTokenSuccess]);

  return (
    <>
      <Modal open={isModal} handleClose={handleCloseModal}>
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
                {tokenData?.data.token}
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
      </Modal>
      <Box>
        {!isLoading && !isError && data && (
          <Grid container spacing={3} wrap="wrap">
            <Grid item>
              <Bookcover coverUrl={data.data[0].coverImageUrl} size="medium" />
            </Grid>
            <Grid item>
              <Stack>
                <Typography marginBottom={2}>
                  <b>Title:</b> {data.data[0].title}
                </Typography>
                <Typography marginBottom={2}>
                  <b>Author:</b> {data.data[0].author}
                </Typography>
                <Typography marginBottom={2}>
                  <b>Genre:</b> {data.data[0].genre}
                </Typography>
                <Typography marginBottom={2}>
                  <b>Release Date:</b>{" "}
                  {new Date(data.data[0].releaseDate).toDateString()}
                </Typography>
                <Typography marginBottom={2}>
                  <b>Description:</b> {data.data[0].description}
                </Typography>
                <Typography marginBottom={2}>
                  <b>Price:</b> &#8358;{data.data[0].amount}
                </Typography>
                <Typography marginBottom={2}>
                  <b>Purchase Count:</b> {data.data[0].purchaseCount}
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  marginBottom={1}
                >
                  <b style={{ marginRight: "5px" }}>Rating:</b>{" "}
                  <Rating
                    name="read-only"
                    value={data.data[0].rating}
                    readOnly
                    precision={0.5}
                  />
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={salesTokenLoading}
                  onClick={() =>
                    generateSalesToken({ token: token, id: String(id) })
                  }
                >
                  {salesTokenLoading ? (
                    <CircularProgress size={15} />
                  ) : (
                    "Generate Token"
                  )}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}

        {!data && isLoading && !isError && (
          <Box sx={{ padding: 2 }}>
            <CircularProgress
              sx={{ margin: "auto", display: "block" }}
              size={40}
            />
            <Typography marginTop={1} align={"center"}>
              Loading...
            </Typography>
          </Box>
        )}
        {!data && isLoading && isError && (
          <Box sx={{ padding: 2 }}>
            <Typography marginBottom={1} align={"center"}>
              Oops! We ran into an error
            </Typography>
            <Button
              sx={{ display: "block", margin: "auto" }}
              onClick={refetch}
              variant="outlined"
              size={"small"}
            >
              Reload
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SpecificBookDetails;
