import clsx from "clsx";
import { FormHelperText, LinearProgress, Typography } from "@mui/material";

import { MyDropzone, type TMyDropzone } from "./MyDropzone";
import { DropzoneFieldWrapper } from "./DropzoneFieldWrapper";

type TDropzoneField = {
  label?: string;
  error?: boolean;
  className?: string;
  helperText?: string;
  showDropZone?: boolean;
  children: React.ReactNode;
  dropZoneProps: Omit<TMyDropzone, "children">;
};

const DropzoneField = ({
  label,
  error,
  children,
  className,
  helperText,
  showDropZone = true,
  dropZoneProps: { uploading, className: dCN, ...rest },
}: TDropzoneField) => {
  return (
    <DropzoneFieldWrapper className={clsx("dcw", className)}>
      {label && (
        <Typography
          component="label"
          color="textSecondary"
          className={clsx("dcw-label", { "dcw-label-error": error })}
        >
          {label}
        </Typography>
      )}
      <div className="dcw-div">
        {uploading && (
          <LinearProgress sx={{ height: "2px" }} color="secondary" />
        )}
        {showDropZone ? (
          <MyDropzone {...rest} className={dCN}>
            {children}
          </MyDropzone>
        ) : (
          children
        )}
      </div>
      {helperText && (
        <FormHelperText error={error} className={clsx("dcw-helper")}>
          {helperText}
        </FormHelperText>
      )}
    </DropzoneFieldWrapper>
  );
};

export { DropzoneField };
