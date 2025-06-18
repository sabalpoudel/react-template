// Spinner.tsx
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface SpinnerProps {
  size?: number; // Size of the spinner
  absolute?: boolean;
  color?: "inherit" | "primary" | "secondary"; // Spinner color
  style?: React.CSSProperties; // Additional styles
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  absolute = true,
  color = "primary",
  style,
}) => {
  const st: React.CSSProperties = absolute
    ? {
        top: "50%",
        left: "50%",
        position: "absolute",
        marginTop: `-${size / 2}px`,
        marginLeft: `-${size / 2}px`,
      }
    : {};
  return (
    <CircularProgress size={size} color={color} style={{ ...st, ...style }} />
  );
};
