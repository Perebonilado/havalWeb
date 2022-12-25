import React, { FC } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Grid,
  Button,
  CircularProgress,
  Typography,
  Stack,
  Rating
} from "@mui/material";

import { useGetBookByIdQuery } from "../../../config/features/api";
import useToken from "../../../hooks/useToken";
import Bookcover from "./Bookcover";

const SpecificBookDetails: FC = () => {
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

  return (
    <Box>
      {!isLoading && !isError && data && (
        <Grid container spacing={3} wrap="wrap">
          <Grid item>
            <Bookcover coverUrl={data.data[0].coverImageUrl} size="medium" />
          </Grid>
          <Grid item>
            <Stack>
                <Typography marginBottom={2}><b>Title:</b> {data.data[0].title}</Typography>
                <Typography marginBottom={2}><b>Author:</b> {data.data[0].author}</Typography>
                <Typography marginBottom={2}><b>Genre:</b> {data.data[0].genre}</Typography>
                <Typography marginBottom={2}><b>Release Date:</b> {new Date(data.data[0].releaseDate).toDateString()}</Typography>
                <Typography marginBottom={2}><b>Description:</b> {data.data[0].description}</Typography>
                <Typography marginBottom={2}><b>Price:</b> &#8358;{data.data[0].amount}</Typography>
                <Typography marginBottom={2}><b>Purchase Count:</b> {data.data[0].purchaseCount}</Typography>
                <Typography sx={{display: "flex", alignItems: "center"}} marginBottom={1}><b style={{marginRight:"5px"}}>Rating:</b> <Rating name="read-only" value={data.data[0].rating} readOnly precision={0.5}/></Typography>
                <Button variant="outlined" size="small">Generate Token</Button>
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
  );
};

export default SpecificBookDetails;
