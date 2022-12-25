import React, { FC, PropsWithChildren } from "react";

import { Dialog } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  open,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      {children}
    </Dialog>
  );
};

export default Modal;
