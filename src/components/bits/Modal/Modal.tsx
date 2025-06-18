import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Modal, IconButton, type ModalProps } from "@mui/material";

import { ModalTitle } from "./ModalTitle";
import { ModalContent } from "./ModalContent";
import { ModalActions } from "./ModalActions";
import { ModalWrapper } from "./ModalWrapper";

type TModalType =
  | "info"
  | "error"
  | "like"
  | "delete"
  | "warning"
  | "success"
  | "storage"
  | "default";

type TModalComp = ModalProps & {
  title?: string;
  actions?: React.ReactNode;
  modalType?: TModalType; // Modal type for title color and icon
  noIcon?: boolean; // Flag to hide the icon if true
  colorTitle?: boolean; // Flag to color the title text, colored title if true
  centerTitle?: boolean;
  closeIcon?: boolean; // If true, shows a close icon in the top-right corner
  maxWidth?: number | string; // Optionally control the max width of the modal
  enableBackdropClose?: boolean;
};

export type { TModalType };

export const ModalComp: React.FC<TModalComp> = ({
  open,
  title,
  onClose,
  actions,
  children,
  noIcon = false,
  colorTitle = true,
  centerTitle = false,
  modalType = "default",
  enableBackdropClose = true,
  closeIcon = true, // Default is true for showing the close icon
  maxWidth = 500, // Default width of the modal (can be controlled externally)
  ...props
}) => {
  const handleClose = () => {
    onClose?.({}, "escapeKeyDown");
  };

  const handleOnClose = (
    event: any,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick" && enableBackdropClose) return;
    onClose?.(event, reason);
  };

  return (
    <Modal open={open} onClose={handleOnClose} {...props}>
      <ModalWrapper maxWidth={maxWidth} className="mw">
        {closeIcon && (
          <IconButton onClick={handleClose} className="mw-close">
            <CloseIcon />
          </IconButton>
        )}
        {title && title !== "" && (
          <ModalTitle
            noIcon={noIcon}
            modalType={modalType}
            colorTitle={colorTitle}
            centerTitle={centerTitle}
          >
            {title}
          </ModalTitle>
        )}
        <ModalContent>{children}</ModalContent>
        <ModalActions onClose={handleClose}>{actions}</ModalActions>
      </ModalWrapper>
    </Modal>
  );
};
