import type { JSX } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import StorageIcon from "@mui/icons-material/Storage";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import { Box, type SxProps, type Theme, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

type TType = "image" | "audio" | "video" | "file" | "storage" | "all";
const ICON: Record<TType, JSX.Element> = {
  file: <NoteAddIcon />,
  audio: <AudioFileIcon />,
  video: <VideoFileIcon />,
  storage: <StorageIcon />,
  all: <AddPhotoAlternateIcon />,
  image: <AddPhotoAlternateIcon />,
};

type TProps = {
  type: TType;
  label: string;
  className?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
};

export default function SelectFileCompSmall(props: TProps) {
  const { type, label, className, onClick, sx = {} } = props;

  return (
    <>
      <Box
        onClick={() => onClick?.()}
        className={`${className} select-file-comp`}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#ececec",
          border: "1px dashed lightgray",
          borderRadius: "50%",
          width: "150px",
          height: "150px",
          cursor: "pointer",
          ...sx,
        }}
      >
        {ICON[type]}
      </Box>
      <Typography
        component={"div"}
        sx={{
          fontSize: "0.9rem",
          fontWeight: "400",
          lineHeight: "1.3rem",
          color: "#717680",
          marginTop: "0.5rem",
        }}
      >
        {label}
      </Typography>
    </>
  );
}
