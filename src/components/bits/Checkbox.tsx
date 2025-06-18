// Checkbox.tsx
import React from "react";
import MUICheckbox, { type CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type TCheckbox = CheckboxProps & {
  label?: string | React.ReactNode; // Optional label for the checkbox
  labelPlacement?: "end" | "start" | "top" | "bottom"; // Positioning of the label relative to the checkbox
};

export const Checkbox: React.FC<TCheckbox> = ({
  label = "",
  className = "",
  labelPlacement = "end",
  ...props
}) => {
  return (
    <FormControlLabel
      label={label}
      className={className}
      labelPlacement={labelPlacement}
      control={<MUICheckbox {...props} />}
    />
  );
};
