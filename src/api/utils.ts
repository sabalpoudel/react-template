import { getEndPoint } from "./endpoint";
import { getLang } from "../lang/utils/getLang";
import { parseJSON, type ParseJSONType, SnackBar } from "../_utils";

const parseErrFunc = (
  err: Error,
  defaultMsg: string
): { parsedError: ParseJSONType; message: string } => {
  const parsedError = parseJSON(err?.message);
  const message =
    typeof parsedError === "string"
      ? parsedError
      : parsedError?.message || parsedError?.error || defaultMsg;
  return { parsedError, message };
};

const getSpecificFromError = (err: Error, key: string) => {
  const parsedError = parseJSON(err?.message);

  // Ensure parsedError is an object before indexing
  if (typeof parsedError === "string") {
    return parsedError;
  } else if (parsedError && typeof parsedError === "object") {
    return parsedError[key];
  }

  return undefined;
};

const handleDefaultError =
  (msg: string, handleError?: (err: Error, msg: string) => void) =>
  (err: Error) => {
    console.error({ handleDefaultError: err });
    const { message, parsedError } = parseErrFunc(err, msg);
    SnackBar({ message, doNotTranslate: Boolean(parsedError) }, "error");

    if (handleError) handleError(err, msg);
  };

const MainSiteLink = (u: string = "") => {
  const lang = getLang();
  const siteLink = getEndPoint("partner");
  return `${siteLink}/${lang}/${u}`;
};

export { parseErrFunc, handleDefaultError, MainSiteLink, getSpecificFromError };
