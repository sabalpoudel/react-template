// import { MIMEType } from "util";
import { isDev } from "./myFunc";
import { elpString } from "./stringHelpers";
import { TFileDetails } from "@api/_interface";

type TCusFileType =
  | "csv"
  | "image"
  | "video"
  | "audio"
  | "application"
  | "image_video"
  | "image_audio"
  | "image_video_audio"
  | "all";

type TFileCat =
  | "pdf"
  | "text"
  | "word"
  | "image"
  | "video"
  | "audio"
  | "other"
  | "spreadsheet"
  | "presentation";

// Define specific file types based on extensions and MIME types
type TFileType =
  | "image"
  | "video"
  | "pdf"
  | "docx"
  | "csv"
  | "txt"
  | "html"
  | "xls"
  | "xlsx"
  | "ods"
  | "json"
  | "zip"
  | "mp3"
  | "mp4"
  | "odt"
  | "rar"
  | "pptx"
  | "spreadsheet"
  | "application"
  | "other";

const DocxTypes = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const XlsxTypes = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const PptxTypes = [
  "application/vnd.ms-powerpoint",
  "application/vnd.ms-powerpoint.*",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
];

const TextTypes = ["text/csv", "text/plain"];

const MediaTypes = ["application/mp4"];

const PdfTypes = ["application/pdf"];

// Define file type categories
const ImageTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/jpg",
  "image/jfif",
  "image/svg+xml",
] as const;

const VideoTypes = [
  "video/ogg",
  "video/mp4",
  "video/webm",
  "video/quicktime", // .mov
  "video/x-matroska", // .mkv
] as const;

const AudioTypes = [
  "audio/mpeg", // .mp3
  "audio/webm",
  "audio/mp4",
  "audio/mp3",
  "audio/wav",
] as const;

const ApplicationTypes = [
  "text/csv",
  "text/plain",
  "application/pdf",
  "application/mp4",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.ms-powerpoint.*",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/json",
  "application/zip",
  "application/vnd.rar",
  "application/vnd.oasis.opendocument.text",
] as const;

const AllFileTypes = [
  ...ImageTypes,
  ...VideoTypes,
  ...AudioTypes,
  ...ApplicationTypes,
] as const;

const OtherTypes: Record<string, TFileType> = {
  "text/html": "html",
  "application/vnd.oasis.opendocument.spreadsheet": "ods",
  "application/json": "json",
  "application/zip": "zip",
  "application/vnd.rar": "rar",
  "application/vnd.oasis.opendocument.text": "odt",
};

const FileTypeMap: Record<string, TFileType> = {
  ...Object.fromEntries(DocxTypes.map((type) => [type, "docx"])),
  ...Object.fromEntries(XlsxTypes.map((type) => [type, "xlsx"])),
  ...Object.fromEntries(PptxTypes.map((type) => [type, "pptx"])),
  ...Object.fromEntries(TextTypes.map((type) => [type, "txt"])),
  ...Object.fromEntries(MediaTypes.map((type) => [type, "mp4"])),
  ...Object.fromEntries(PdfTypes.map((type) => [type, "pdf"])),
  ...OtherTypes,
  ...Object.fromEntries(ImageTypes.map((type) => [type, "image"])),
  ...Object.fromEntries(VideoTypes.map((type) => [type, "video"])),
  ...Object.fromEntries(AudioTypes.map((type) => [type, "mp3"])),
};

// Extension-based file type detection
const ExtensionMap: Record<string, TFileType> = {
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  webp: "image",
  svg: "image",
  mp4: "mp4",
  mov: "video",
  webm: "video",
  mkv: "video",
  avi: "video",
  flv: "video",
  mp3: "mp3",
  wav: "mp3",
  pdf: "pdf",
  doc: "docx",
  docx: "docx",
  txt: "txt",
  csv: "csv",
  html: "html",
  xls: "xls",
  xlsx: "xlsx",
  ods: "ods",
  json: "json",
  zip: "zip",
  rar: "rar",
  ppt: "pptx",
  pptx: "pptx",
  odt: "odt",
};

// Function to get file type from MIME type or file extension
const getFileType = (file: File | Blob | string): TFileType => {
  if (typeof file === "object" && "type" in file && file.type) {
    return FileTypeMap[file.type] || "other";
  }

  if (typeof file === "string") {
    if (file.includes("data:image")) return "image";
    if (file.includes("data:video")) return "video";
    if (file.includes("data:audio")) return "mp3";

    const extMatch = file.toLowerCase().match(/\.([a-z0-9]+)(\?.*)?$/);
    if (extMatch) return ExtensionMap[extMatch[1]] || "other";
  }

  return "other";
};

const downloadFile = (url: string, filename: string) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = url;
  anchorElement.target = "_blank";
  anchorElement.download = filename;
  anchorElement.style.display = "none";
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
};

function isPdfUrl(url: string | undefined): boolean {
  if (url) {
    const extension = url.split(".").pop()?.toLowerCase();
    return extension === "pdf";
  }
  return false;
}

const getFileNameFromUrl = (url: string): string => {
  if (!url) return "";
  // "https://skysales-test.s3.ap-northeast-1.amazonaws.com/1696249571532-sss.jpg"
  const b = url.split("-");
  b.splice(0, 4);
  return b.join("");
};
const getFileNameFromUrl2 = (url: string): string => {
  try {
    if (!url) return "";
    // "https://sk-dev.s3.isk01.sakurastorage.jp/1738055176262-SKYSALES_E9_20Jan.pdf"
    const parsedUrl = new URL(url);
    return parsedUrl.pathname.split("/").pop() || "";
  } catch (error) {
    if (isDev) console.error("getFileNameFromUrl2Error=>", url, error);
    return "";
  }
};

const getObjectURLSrc = (v?: string | File | Blob): string => {
  try {
    return v ? (typeof v === "string" ? v : URL.createObjectURL(v)) : "";
  } catch (error) {
    console.error("getObjectURLSrcErr:", error);
    return "";
  }
};
const revokeObjectURLSrc = (src?: string) => {
  try {
    if (src && typeof src === "string") URL.revokeObjectURL(src);
  } catch (error) {
    console.error("revokeObjectURLSrc:", error);
  }
  return;
};

type TParseFileDetails = {
  url: string;
  id?: number;
  file?: File;
  name: string;
  title: string;
  type: TFileType;
};
const parseFileDetails = (
  file: string | File | TFileDetails
): TParseFileDetails => {
  if (typeof file === "string") {
    const name = decodeURIComponent(getFileNameFromUrl2(file));
    return {
      name,
      url: file,
      id: undefined,
      title: elpString(name, 30),
      type: getFileType(file) as TFileType,
    };
  } else if (file instanceof File || file instanceof Blob) {
    return {
      id: undefined,
      name: file.name,
      title: file.name,
      url: getObjectURLSrc(file as File),
      type: getFileType(file) as TFileType,
      file: file instanceof File ? file : undefined,
    };
  } else {
    const name = decodeURIComponent(file.name || getFileNameFromUrl2(file.url));
    return {
      name,
      id: file?.id,
      url: file?.url,
      title: elpString(name, 30),
      type: file.type || (getFileType((file as TFileDetails).url) as TFileType),
    };
  }
};

export type { TCusFileType, TFileType, TFileCat };
export {
  VideoTypes,
  ImageTypes,
  AudioTypes,
  AllFileTypes,
  ApplicationTypes,
  isPdfUrl,
  getFileType,
  downloadFile,
  getObjectURLSrc,
  getFileNameFromUrl,
  revokeObjectURLSrc,
  getFileNameFromUrl2,
  parseFileDetails,
};
