import React, { FC } from "react";

import { Box } from "@mui/material";

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
  return (
    <Box sx={{ width: "103px", cursor: "pointer",}}>
      <Bookcover coverUrl={coverUrl} />
      <BookInfo title={title} author={author} id={id} amount={amount}/>
    </Box>
  );
};

export default Book;
