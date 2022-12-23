import React, { FC, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { toast } from "react-toastify";

import { fileSizeConversionRate } from "../constants";

interface Props {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileDescription: string;
  allowedMimeTypes: string[];
  maxFileSizeInMB: number;
}

const UploadFileButton: FC<Props> = ({
  file,
  setFile,
  fileDescription,
  allowedMimeTypes,
  maxFileSizeInMB,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        border: "1px dashed lightgray",
        padding: 1,
      }}
    >
      {!file ? (
        <Button variant="outlined" component="label">
          Upload
          <input
            hidden
            accept="*"
            multiple
            type="file"
            onChange={(e) => {
              if (
                e.target.files &&
                allowedMimeTypes.includes(e.target.files[0].type) &&
                Number(e.target.files[0].size) <=
                  maxFileSizeInMB *
                    fileSizeConversionRate *
                    fileSizeConversionRate
              ) {
                setFile(e.target.files[0]);
              } else toast.error("Upload correct file type and size");
            }}
          />
        </Button>
      ) : (
        <Delete
          onClick={() => setFile(null)}
          sx={{
            cursor: "pointer",
            fill: "crimson",
            "&:hover": {
              transform: "scale(1.2)",
              transition: ".3s ease-in-out",
            },
          }}
        />
      )}
      {file && <Typography noWrap={true}>{file.name}</Typography>}
      {!file && <Typography noWrap={true}>{fileDescription}</Typography>}
    </Box>
  );
};

export default UploadFileButton;
