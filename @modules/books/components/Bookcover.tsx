import React, { FC } from "react";

import { Box } from "@mui/material";

interface Props {
  coverUrl: string;
}

const Bookcover: FC<Props> = ({ coverUrl }) => {
  return (
    <Box sx={{ width: "103px", height: "160px", marginBottom: "8px" }}>
      <img
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "6px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
        src={coverUrl}
        alt="book cover"
      />
    </Box>
  );
};

export default Bookcover;
