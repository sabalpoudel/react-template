// LoadingButton.tsx
import React from "react";
import Button, { type ButtonProps } from "@mui/material/Button";
import { Spinner } from "./Spinner";

type TButton = ButtonProps & {
  isLoading?: boolean;
};

export const ButtonComp: React.FC<TButton> = ({
  isLoading = false,
  disabled,
  children,
  sx = {},
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <Button
      {...props}
      disabled={isDisabled}
      sx={{ position: "relative", ...sx }}
    >
      {isLoading && (
        <Spinner size={16} color="inherit" style={{ marginRight: 8 }} />
      )}
      {children}
    </Button>
  );
};
