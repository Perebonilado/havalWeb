import React, { FC } from "react";

import { Box, Typography, Tooltip } from "@mui/material";

interface Props {
  title: string;
  author: string;
  id: string | number;
  amount: string | number;
}

const BookInfo: FC<Props> = ({ title, author, id, amount }) => {
  return (
    <Tooltip title={`${title} by ${author}`}>
      <Box>
        <Typography fontWeight={600} noWrap={true}>
          {title}
        </Typography>
        <Typography noWrap={true} sx={{ color: "rgb(62, 80, 96)" }}>
          {author}
        </Typography>
        <Typography noWrap={true} sx={{ color: "rgb(62, 80, 96)" }}>
          Price: <>&#8358;</>
          {amount}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default BookInfo;
