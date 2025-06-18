import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Typography } from "@mui/material";

import type { TStorageFiles } from "@api/interface";
import { elpString } from "@utils/stringHelpers";
import { getStringFromUri } from "@utils/regexHelper";
import { AvatarComp } from "@components/bits/FileComp/Avatar";

type TProps = {
  disabled?: boolean;
  files: (File | TStorageFiles | string)[];
  onChange?: (v: (File | TStorageFiles | string)[]) => void;
};

export const ViewFilesAvatar = (props: TProps) => {
  const { files, onChange, disabled = false } = props;

  const handleRemove = (idx: number) => () => {
    if (disabled) return;
    const tempList = [...files];
    tempList.splice(idx, 1);
    if (onChange) onChange(tempList);
  };

  return (
    <Box
      component="ul"
      sx={{
        gap: ".2rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {files?.length > 0 &&
        files?.map((file, index) => {
          const title =
            typeof file === "string"
              ? getStringFromUri(file)
              : (file as TStorageFiles)?.name || (file as File)?.name;
          const src =
            typeof file === "string"
              ? file
              : (file as TStorageFiles)?.url || "#";

          return (
            <li key={`${title}-${index}`}>
              <Typography
                href={src}
                component="a"
                target="_blank"
                color="textSecondary"
                sx={{
                  gap: "0.1rem",
                  display: "flex",
                  fontSize: "0.75rem",
                  position: "relative",
                  flexDirection: "column",
                }}
              >
                <Typography title={title} variant="caption">
                  {elpString(title)}
                </Typography>
                <AvatarComp
                  src={src}
                  alt={title}
                  variant="rounded"
                  sx={{ width: 50, height: 50 }}
                />
                {onChange && !disabled && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={handleRemove(index)}
                    sx={{
                      right: 0,
                      top: "10px",
                      fontSize: "0.75rem",
                      position: "absolute",
                    }}
                  >
                    <ClearIcon
                      fontSize="small"
                      sx={{
                        fontSize: "0.75rem",
                      }}
                    />
                  </IconButton>
                )}
              </Typography>
            </li>
          );
        })}
    </Box>
  );
};
