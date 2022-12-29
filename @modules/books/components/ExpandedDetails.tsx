import React, { FC } from "react";

import { Typography, Stack, Rating } from "@mui/material";
import { GetBookByIdResponse } from "../../../@types/Book";

interface Props {
  bookData: GetBookByIdResponse;
}

const ExpandedDetails: FC<Props> = ({ bookData }) => {
  return (
    <Stack spacing={2}>
      <Typography>
        <b>Title:</b> {bookData.data[0].title}
      </Typography>
      <Typography>
        <b>Author:</b> {bookData.data[0].author}
      </Typography>
      <Typography>
        <b>Genre:</b> {bookData.data[0].genre}
      </Typography>
      <Typography>
        <b>Release Date:</b>{" "}
        {new Date(bookData.data[0].releaseDate).toDateString()}
      </Typography>
      <Typography>
        <b>Description:</b> {bookData.data[0].description}
      </Typography>
      <Typography>
        <b>Price:</b> &#8358;{bookData.data[0].amount}
      </Typography>
      <Typography>
        <b>Purchase Count:</b> {bookData.data[0].purchaseCount}
      </Typography>
      <Typography
        sx={{ display: "flex", alignItems: "center" }}
        marginBottom={1}
      >
        <b style={{ marginRight: "5px" }}>Rating:</b>{" "}
        <Rating
          name="read-only"
          value={bookData.data[0].rating}
          readOnly
          precision={0.5}
        />
      </Typography>
    </Stack>
  );
};

export default ExpandedDetails;
