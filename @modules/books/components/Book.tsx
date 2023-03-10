import React, { FC } from "react";
import { useRouter } from "next/router";

import { Box, Stack } from "@mui/material";

import Bookcover from "./Bookcover";
import BookInfo from "./BookInfo";

interface Props {
  title: string;
  author: string;
  coverUrl: string;
  id: string | number;
  amount: string | number;
}

const Book: FC<Props> = ({ title, author, coverUrl, id, amount }) => {
  const router = useRouter();

  return (
    <Box
      sx={{ width: "103px", cursor: "pointer" }}
      onClick={() => router.push(`/books/${id}`)}
    >
      <Stack spacing={1}>
        <Bookcover coverUrl={coverUrl} />
        <BookInfo title={title} author={author} id={id} amount={amount} />
      </Stack>
    </Box>
  );
};

export default Book;
