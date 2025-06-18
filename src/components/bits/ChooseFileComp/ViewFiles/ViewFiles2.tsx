import {
  getFileType,
  getObjectURLSrc,
  revokeObjectURLSrc,
} from "@utils/fileUtils";
import { getRandomString } from "@utils/stringHelpers";
import DeleteIcon from "@mui/icons-material/Delete";

import { FileComp } from "@components/bits/FileComp";
import { ViewFiles2Wrapper } from "./ViewFiles2Wrapper";

type TViewFiles2 = {
  maxHeight?: string;
  roundedImg?: boolean;
  files: (File | string)[];
  onChange?: (v: (File | string)[], idx?: number) => void;
};

type TDisplayFileItem = {
  file: File | string;
  onRemove?: () => void;
  className?: string;
};
const DisplayFileItem = ({ file, onRemove, className }: TDisplayFileItem) => {
  const type = getFileType(file);
  const src = getObjectURLSrc(file);
  const isFile = typeof file !== "string";

  const handleRemove = () => {
    revokeObjectURLSrc(src);
    onRemove?.();
  };

  return (
    <div className="dfi">
      <a
        className="dfi-a"
        href={isFile ? "#" : src}
        target={isFile ? "" : "_blank"}
      >
        <FileComp
          src={src}
          type={type}
          alt={`img-${getRandomString(3)}`}
          // vidProps={{ loop: true, muted: true, controls: true }}
          className={className !== "" ? "rounded" : "dfi-a-file"}
          imgProps={{ type: "comp", width: 150, height: 150, src }}
          // audProps={{ loop: true, muted: true, controls: true, className: "" }}
        />
      </a>

      <div onClick={handleRemove} className="dfi-icon">
        <DeleteIcon className="dfi-icon-remove" />
      </div>
    </div>
  );
};

export const ViewFiles2 = ({
  files,
  onChange,
  roundedImg = false,
}: TViewFiles2) => {
  const l = files.length;

  const handleRemove = (idx: number) => () => {
    const tempList = [...files];
    tempList.splice(idx, 1);
    if (onChange) onChange(tempList, idx);
  };

  return (
    <ViewFiles2Wrapper length={l} className="vfw">
      {files?.map((f, i) => {
        return (
          <DisplayFileItem
            file={f}
            key={`${i}`}
            className={roundedImg ? "rounded" : ""}
            onRemove={onChange ? handleRemove(i) : undefined}
          />
        );
      })}
    </ViewFiles2Wrapper>
  );
};
