import React, { FC } from "react";

import { Box } from "@mui/material";

import { customImageHeightPx, customImageWidthPx } from "../utils/constants";

interface Props {
  coverUrl: string;
  size?: "small" | "medium" | "large";
}

const Bookcover: FC<Props> = ({ coverUrl, size = "small" }) => {
  const imageSizeMultiple = {
    small: 1,
    medium: 3,
    large: 5,
  };

  return (
    <Box
      sx={{
        width: `${imageSizeMultiple[size] * customImageWidthPx}px`,
        height: `${imageSizeMultiple[size] * customImageHeightPx}px`,
      }}
    >
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
