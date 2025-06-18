import React from "react";
import {
  Slide,
  Dialog,
  styled,
  IconButton,
  type DialogProps,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { TransitionProps } from "@mui/material/transitions";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
  },
}));

type TFullscreenDialogProps = DialogProps & {
  onDialogClose: () => void;
  enableBackdropClose?: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FullscreenDialog: React.FC<TFullscreenDialogProps> = ({
  children,
  onDialogClose,
  enableBackdropClose = true,
  ...dialogProps
}) => {
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDialogClose?.();
  };

  const handleOnClose = (_: any, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick" && enableBackdropClose) return;
    onDialogClose?.();
  };

  return (
    <StyledDialog
      fullScreen
      onClose={handleOnClose}
      TransitionComponent={Transition}
      {...dialogProps}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          top: 16,
          zIndex: 2,
          right: 16,
          color: "white",
          position: "absolute",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{children}</DialogContent>
    </StyledDialog>
  );
};
