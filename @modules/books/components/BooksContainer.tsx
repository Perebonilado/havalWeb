import React, { FC, useState, useEffect } from "react";

import { Grid, Pagination, Box, Typography, Button } from "@mui/material";

import { toast } from "react-toastify";

import Book from "./Book";
import SkeletonLoader from "./SkeletonLoader";
import { useGetMerchantBooksQuery } from "../../../config/features/api";
import useToken from "../../../hooks/useToken";

const BooksContainer: FC = () => {
  const { token } = useToken();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const { data, isLoading, isError, refetch } = useGetMerchantBooksQuery(
    { page: currentPage - 1, perPage: perPage, token: token },
    {
      skip: !token,
      refetchOnMountOrArgChange: true,
    }
  );

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isError) toast.error("Oops! Error Fetching Book");
  }, [isError]);

  return (
    <Box>
      <Typography variant="h4" marginBottom={3}>
        Your Uploaded Books
      </Typography>
      {data && !isLoading && !isError && (
        <Grid container spacing={6} wrap="wrap">
          {data.data.length > 0 ? (
            data.data.map((book) => {
              return (
                <Grid item key={book._id}>
                  <Book
                    author={book.author}
                    title={book.title}
                    id={book._id}
                    coverUrl={book.coverImageUrl}
                    amount={book.amount}
                  />
                </Grid>
              );
            })
          ) : (
            <Grid item>
              <Typography>You are yet to upload any books</Typography>
            </Grid>
          )}
        </Grid>
      )}

      {!data && isLoading && !isError && (
        <Grid container spacing={6} wrap="wrap">
          <Grid item>
            <SkeletonLoader />
          </Grid>
          <Grid item>
            <SkeletonLoader />
          </Grid>
          <Grid item>
            <SkeletonLoader />
          </Grid>
          <Grid item>
            <SkeletonLoader />
          </Grid>
        </Grid>
      )}

      {!data && !isLoading && isError && (
        <Box sx={{ paddingTop: 5 }}>
          <Button
            variant="contained"
            sx={{ display: "block", margin: "auto" }}
            onClick={refetch}
          >
            Reload
          </Button>
        </Box>
      )}

      {data && data.totalPageCount >= 1 && (
        <Box sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={data.totalPageCount}
            page={currentPage}
            variant="outlined"
            onChange={(e, page) => handlePageChange(e, page)}
          />
        </Box>
      )}
    </Box>
  );
};

export default BooksContainer;
