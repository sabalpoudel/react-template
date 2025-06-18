import { useState } from "react";
import { Fab } from "@mui/material";
import { useIntl } from "react-intl";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { ChooseFileComp } from "@components/bits/ChooseFileComp/ChooseFileComp";
import { Spinner } from "@components/bits/Spinner";
import { useCallAddFiles } from "@api/helpers/storage/useCallAddFiles";
import { parseObjToFormData } from "@utils/formDataHelpers";

type TProps = {
  platformId?: number;
  className?: string;
  onAddFileSuccess: () => void;
};

export const FileStorageAddButton = (props: TProps) => {
  const { platformId, onAddFileSuccess } = props;
  const { formatMessage } = useIntl();

  const [image, setImage] = useState<File[]>([]);

  const { loading, callAddFiles } = useCallAddFiles({
    platformId,
    onSuccess: onAddFileSuccess,
  });

  const handleOnChange = async (v: File[]) => {
    const formData = await parseObjToFormData({ images: v });
    callAddFiles({ formData });
    setImage(v);
  };

  return (
    <ChooseFileComp
      showStorage={false}
      className={"fsw-choose-file"}
      dropZoneProps={{ val: image, onChange: handleOnChange }}
    >
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        disabled={loading}
        className="fsw-choose-file-fab"
      >
        {loading ? (
          <Spinner
            size={20}
            absolute={false}
            color="inherit"
            style={{ marginRight: ".5rem" }}
          />
        ) : (
          <AddCircleIcon className="icon" />
        )}
        <span>&nbsp;{formatMessage({ id: "add_files" })}</span>
      </Fab>
    </ChooseFileComp>
  );
};
