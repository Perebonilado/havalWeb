import React, { FC } from "react";

import { Drawer } from "@mui/material";

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
      {content}
    </Drawer>
  );
};

export default AppDrawer;
