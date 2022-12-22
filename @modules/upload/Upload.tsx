import React, { FC } from "react";

import { Box, Typography, Grid } from "@mui/material";

import UploadChoice from "./components/UploadChoice";
import { UploadChoiceData } from "./constants";

const Upload: FC = () => {
  return (
    <Box>
      <Typography variant="h5" marginBottom={3}>What do you want to upload?</Typography>
      <Grid container wrap="wrap" spacing={5}>
        {UploadChoiceData.map((data, idx) => {
          return data.isActive ? (
            <Grid item key={idx}>
              <UploadChoice
                key={idx}
                icon={data.icon}
                title={data.title}
                path={data.path}
              />
            </Grid>
          ) : (
            null
          );
        })}
      </Grid>
    </Box>
  );
};

export default Upload;
