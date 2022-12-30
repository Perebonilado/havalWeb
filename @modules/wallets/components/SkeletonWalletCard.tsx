import React, { FC } from "react";

import { Card, Skeleton, Stack } from "@mui/material";

const SkeletonWalletCard: FC = () => {
  return (
    <Card
      sx={{
        width: "250px",
        height: "150px",
        padding: 1.5,
        cursor: "pointer",
      }}
    >
      <Stack spacing={3}>
        <Skeleton variant="rectangular" width={"70px"} height="10px"/>
        <Skeleton variant="rectangular" width={"90px"} height="10px"/>
        <Skeleton variant="rectangular" width={"100%"} height="30px" />
      </Stack>
    </Card>
  );
};

export default SkeletonWalletCard;
