import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Grid,
  Button,
  CircularProgress,
  Typography,
  Stack
} from "@mui/material";

import { toast } from "react-toastify";

import {
  useGetBookByIdQuery,
  useSendTokenViaEmailMutation,
} from "../../../config/features/api";
import useToken from "../../../hooks/useToken";
import Bookcover from "./Bookcover";
import Modal from "../../../@shared/components/Modal";
import UnusedTokenTable from "./UnusedTokenTable";
import ExpandedDetails from "./ExpandedDetails";
import TokenGeneration from "./TokenGeneration";

const BookView: FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { token } = useToken();
  const {
    data: book,
    isError: bookError,
    refetch: refetchBook,
    error,
    isLoading: bookLoading,
  } = useGetBookByIdQuery(
    { token: token, id: `${String(id)}` },
    {
      skip: !token || !id,
      refetchOnReconnect: true,
    }
  );

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

  const handleCloseModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (tokenEmailSuccess) {
      handleCloseModal();
      toast.success("Email sent successfully");
    }
  }, [tokenEmailSuccess]);

  return (
    <>
      <Modal open={isModal} handleClose={handleCloseModal}>
        <TokenGeneration
          sendTokenEmail={sendTokenEmail}
          token={token}
          bookId={String(id)}
          book={book}
          tokenEmailLoading={tokenEmailLoading}
        />
      </Modal>
      <Box>
        {!bookLoading && !bookError && book && (
          <Grid container spacing={3} wrap="wrap">
            <Grid item>
              <Bookcover coverUrl={book.data[0].coverImageUrl} size="medium" />
            </Grid>
            <Grid item>
              <Stack spacing={2}>
                <ExpandedDetails bookData={book} />

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setIsModal(true)}
                >
                  Generate Token
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}

        {!book && bookLoading && !bookError && (
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
        {!book && bookLoading && bookError && (
          <Box sx={{ padding: 2 }}>
            <Typography marginBottom={1} align={"center"}>
              Oops! We ran into an error
            </Typography>
            <Button
              sx={{ display: "block", margin: "auto" }}
              onClick={refetchBook}
              variant="outlined"
              size={"small"}
            >
              Reload
            </Button>
          </Box>
        )}
      </Box>
      <UnusedTokenTable asset_id={String(id)} auth_token={token} />
    </>
  );
};

export default BookView;
