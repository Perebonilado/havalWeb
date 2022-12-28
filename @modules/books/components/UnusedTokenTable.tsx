import React, { FC } from "react";

import {
  TableContainer,
  Table,
  CircularProgress,
  Box,
  Button,
  Typography,
} from "@mui/material";

import UnusedTokensTableBody from "./UnusedTokensTableBody";
import UnusedTokensTableHead from "./UnusedTokensTableHead";
import { useGetUnusedTokensQuery } from "../../../config/features/api";

interface Props {
  asset_id: string;
  auth_token: string;
}

const UnusedTokenTable: FC<Props> = ({ asset_id, auth_token }) => {
  const { data, isLoading, error, isError, refetch } = useGetUnusedTokensQuery(
    {
      asset_id: asset_id,
      asset_type: "book",
      auth_token: auth_token,
    },
    {
      skip: !auth_token || !asset_id,
    }
  );

  return (
    <>
      <Typography
        variant={"h5"}
        fontWeight={600}
        marginBottom={3}
        marginTop={5}
      >
        Unused Tokens
      </Typography>
      {!isLoading &&
        !isError &&
        data &&
        (data.data.length > 0 ? (
          <TableContainer>
            <Table>
              <UnusedTokensTableHead />
              <UnusedTokensTableBody
                data={data.data}
                auth_token={auth_token}
                refetchTokens={refetch}
              />
            </Table>
          </TableContainer>
        ) : (
          <Box>
            <Typography align="center">No unused tokens</Typography>
          </Box>
        ))}
      {isLoading && !isError && !data && (
        <Box>
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
          <Typography align="center" marginTop={2}>
            Loading unused tokens...
          </Typography>
        </Box>
      )}
      {!isLoading && !data && isError && (
        <Box>
          <Button
            onClick={refetch}
            size="small"
            sx={{ display: "block", margin: "auto" }}
          >
            Reload
          </Button>
        </Box>
      )}
    </>
  );
};

export default UnusedTokenTable;
