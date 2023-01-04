import React, { FC } from "react";

import { Drawer, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../config/store";
import { closeDrawer } from "../../config/features/drawer";

const AppDrawer: FC = () => {
  const dispatch = useDispatch();

  const { isOpen, content } = useSelector((state: RootState) => state.drawer);

  return (
    <Drawer
      open={isOpen}
      onClose={() => dispatch(closeDrawer())}
      anchor="right"
    >
      <Box sx={{ padding: 2, width: "350px", maxWidth: "100%" }}>{content}</Box>
    </Drawer>
  );
};

export default AppDrawer;
