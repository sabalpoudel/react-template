// InputField.tsx
import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import type {
  InputProps,
  InputBaseProps,
  InputLabelProps,
} from "@mui/material";

type TInputField = TextFieldProps & {
  InputProps?: InputProps;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  InputLabelProps?: InputLabelProps;
  inputProps?: InputBaseProps["inputProps"];
};

export const InputField: React.FC<TInputField> = ({
  InputLabelProps,
  startAdornment,
  endAdornment,
  InputProps,
  inputProps,
  slotProps,
  ...props
}) => {
  const ip = (slotProps?.input || InputProps) as InputProps;
  return (
    <TextField
      {...props}
      slotProps={{
        htmlInput: { ...(slotProps?.htmlInput || inputProps) },
        inputLabel: { ...(slotProps?.inputLabel || InputLabelProps) },
        input: {
          ...ip,
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : (
            ip?.startAdornment
          ),
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : (
            ip?.endAdornment
          ),
        },
      }}
    />
  );
};
