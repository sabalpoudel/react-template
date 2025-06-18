// components/ModalContent.tsx
import React from "react";
import { Box } from "@mui/material";

type TModalContent = {
  children: React.ReactNode;
};

export const ModalContent: React.FC<TModalContent> = ({ children }) => {
  return <Box sx={{ mt: 2 }}>{children}</Box>;
};
