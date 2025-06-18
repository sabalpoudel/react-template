"use client";
import { ImgComp, type TImgComp } from "./ImgComp";
// import { TVidComp, VidComp } from "./VidComp";
import { AppComp, type TAppComp } from "./AppComp";
// import { AudioComp, TAudioComp } from "./AudComp";
import { getFileType, type TFileType } from "../../../_utils";

type TFileComp = {
  src: string;
  alt: string;
  type?: TFileType;
  className?: string;
  imgProps?: TImgComp;
  // vidProps?: TVidComp;
  appProps?: TAppComp;
  // audProps?: TAudioComp;
};

export const blurDataURL =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8ePtOAQAIBwL60MBUqgAAAABJRU5ErkJggg==";

const FileComp = ({
  src,
  type,
  imgProps,
  appProps,
  // audProps,
  // vidProps,
  ...rest
}: TFileComp) => {
  const fileType = type || getFileType(src);

  if (fileType === "image")
    return <ImgComp src={src} {...rest} {...imgProps} />;
  // else if (fileType === "video")
  //   return <VidComp src={src} {...rest} {...vidProps} />;
  // else if (fileType.includes("audio"))
  //   return <AudioComp src={src} {...rest} {...audProps} />;
  else if (fileType === "application")
    return <AppComp src={src} {...rest} {...appProps} />;
  else return <ImgComp src={src} {...rest} {...imgProps} />;
};

export { FileComp };
