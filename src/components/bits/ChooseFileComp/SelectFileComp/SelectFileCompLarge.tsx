import type { JSX } from "react";
import { Box, type SxProps, type Theme, Typography } from "@mui/material";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import StorageIcon from "@mui/icons-material/Storage";
import UploadIcon from "@components/_icons/UploadIcon";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

type TType = "image" | "audio" | "video" | "file" | "storage" | "all";
const ICON: Record<TType, JSX.Element> = {
  file: <NoteAddIcon />,
  image: <UploadIcon />,
  audio: <AudioFileIcon />,
  video: <VideoFileIcon />,
  storage: <StorageIcon />,
  all: <AddPhotoAlternateIcon />,
};

type TProps = {
  type: TType;
  label: string;
  subLabel?: string;
  className?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
};
export default function SelectFileCompLarge(props: TProps) {
  const { type, label, subLabel, className, onClick, sx = {} } = props;

  return (
    <Box
      onClick={() => onClick?.()}
      className={`${className} select-file-comp`}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        border: "1px dashed #E0E0E0",
        borderRadius: "8px",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        ...sx,
      }}
    >
      {ICON[type]}
      <Typography
        component={"div"}
        sx={{
          fontSize: "0.9rem",
          lineHeight: "1.3rem",
          fontWeight: "600",
          margin: "0.5rem 0",
        }}
      >
        {label}
      </Typography>
      {subLabel && (
        <Typography
          component={"div"}
          sx={{
            fontSize: "0.9rem",
            lineHeight: "1.3rem",
            fontWeight: "400",
            color: "#717680",
          }}
        >
          {subLabel}
        </Typography>
      )}
    </Box>
  );
}
