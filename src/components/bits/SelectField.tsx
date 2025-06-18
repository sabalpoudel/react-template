// SelectField.tsx
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { type SelectProps } from "@mui/material/Select";

type TSelectOpt<T> = {
  extra?: T;
  label: string;
  value: string | number;
};

export type { TSelectOpt };

type TSelectField = SelectProps & {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  label?: string;
  options: { label: string; value: any }[];
};

export const SelectField: React.FC<TSelectField> = ({
  startAdornment,
  endAdornment,
  label,
  options,
  fullWidth = false,
  ...props
}) => {
  return (
    <FormControl variant="outlined" fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        {...props}
        label={label}
        startAdornment={
          startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          )
        }
        endAdornment={
          endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          )
        }
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
