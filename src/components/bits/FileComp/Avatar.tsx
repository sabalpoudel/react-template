import React from "react";
import { Avatar, type AvatarProps } from "@mui/material";

// Define additional props that extend the AvatarProps
type TUserAvatar = AvatarProps & {
  alt?: string;
  src?: string;
  allText?: boolean;
  noTitle?: boolean;
};
export const AvatarComp: React.FC<TUserAvatar> = ({
  src,
  alt = "",
  allText = false,
  noTitle = false,
  ...props
}) => {
  // Compute avatarText based on the alt prop
  const avatarText = allText ? alt : alt?.slice(0, 1)?.toUpperCase();

  return (
    <Avatar alt={alt} src={src} {...props} title={noTitle ? undefined : alt}>
      {!src && avatarText}
    </Avatar>
  );
};
