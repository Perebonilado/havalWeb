import React, { FC } from "react";
import { useRouter } from "next/router";

import { Box } from "@mui/material";

import { useGetBookByIdQuery } from "../../../config/features/api";
import useToken from "../../../hooks/useToken";

const SpecificBookDetails: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useToken();
  const { data, isSuccess, isError, refetch, error } = useGetBookByIdQuery(
    { token: token, id: `${String(id)}` },
    {
      skip: !token || !id,
      refetchOnReconnect: true
    }
  );

  return <Box>{data?.data[0].title}</Box>;
};

export default SpecificBookDetails;
