import React, { FC, useState } from "react";

import { Card, Avatar, Typography, Popover, Button, Box } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import Cookies from "js-cookie"

import { AUTH_TOKEN } from "../../@shared/constants"
import useToken from "../../hooks/useToken";
import { useGetUserProfileQuery } from "../../config/features/api"

const UserCard: FC = () => {
  
  const { token } = useToken()
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const { data } = useGetUserProfileQuery(token, {
    skip: !token
  })

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Card
        sx={{
          width: "200px",
          maxWidth: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1
          }}
        >
          <Avatar
            alt="profile picture"
            src={data?.data.profilePictureURL}
            sx={{ width: 20, height: 20, bgcolor: "#1976d2" }}
          >
            {data?.data.username || ""}
          </Avatar>
          <Typography>{data?.data.username}</Typography>
        </Box>
        <Box>
          <MoreVert onClick={(e) => handleClick(e)} />
        </Box>
      </Card>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Button variant="contained" size="small" sx={{ borderRadius: "6px" }} onClick={()=>{
          Cookies.remove(`${AUTH_TOKEN}`)
          window.location.pathname="/auth"
        }}>
          Logout
        </Button>
      </Popover>
    </>
  );
};

export default UserCard;
