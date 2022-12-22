import React, { FC } from "react";
import { useRouter } from "next/router";

import { Paper, Box, Stack, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

interface Props {
  icon: any;
  title: string;
  path: string;
}

const UploadChoice: FC<Props> = ({ icon, title, path }) => {
  const router = useRouter();

  return (
    <Paper
      sx={{ padding: 2, width: "150px", height: "200px", cursor: "pointer" }}
      onClick={() => {
        router.push(path);
      }}
    >
      <Stack spacing={5}>
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: "rgba(60,60,67,.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "100px",
            margin: "auto",
          }}
        >
          {icon}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography align="center" fontSize={16} fontWeight={500}>
            {title}
          </Typography>
          <ChevronRight sx={{fontSize: 26}}/>
        </Box>
      </Stack>
    </Paper>
  );
};

export default UploadChoice;
