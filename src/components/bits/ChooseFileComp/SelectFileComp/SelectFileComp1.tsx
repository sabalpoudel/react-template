import { type JSX } from "react";
import { FormattedMessage } from "react-intl";
import { type SxProps, type Theme, Typography } from "@mui/material";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import StorageIcon from "@mui/icons-material/Storage";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
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

export const SelectFileComp1 = (props: TProps) => {
  const { type, label, className, onClick, sx = {} } = props;
  // const t = useTranslations("Shared");
  return (
    <Typography
      color="secondary"
      onClick={() => onClick?.()}
      className={`${className} select-file-comp`}
      sx={{
        gap: "1rem",
        display: "flex",
        padding: "1rem",
        cursor: "pointer",
        borderRadius: "4px",
        alignItems: "center",
        backgroundColor: "#ececec",
        border: "1px dashed lightgray",
        ...sx,
      }}
    >
      {ICON[type]}
      <span>
        <FormattedMessage id={`${label}`} />
      </span>
    </Typography>
  );
};
