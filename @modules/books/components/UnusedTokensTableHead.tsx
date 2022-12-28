import React, { FC } from "react";

import { TableHead, TableRow, TableCell, Typography } from "@mui/material";

import { UnusedTokensTableHeadData } from "../utils/constants";

const UnusedTokensTableHead: FC = () => {
  return (
    <TableHead>
      <TableRow>
        {UnusedTokensTableHeadData.map((item, idx) => {
          return (
            <TableCell key={idx}>
              <Typography fontWeight={600}>{item}</Typography>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default UnusedTokensTableHead;
