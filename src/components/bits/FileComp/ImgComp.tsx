import { useRef } from "react";

import { getRandomString } from "../../../_utils";

const ImagePlaceHolderLink = "/assets/images/placeholder-img.png";
const blurDataURL =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8ePtOAQAIBwL60MBUqgAAAABJRU5ErkJggg==";

type TImgComp = {
  src: string;
  alt?: string;
  fill?: boolean;
  type?: "comp";
  width?: number | string;
  height?: number | string;
  placeholder?: "blur" | "empty" | `data:image/${string}` | undefined;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const ImgComp = ({
  src,
  type,
  width,
  height,
  placeholder,
  fill = false,
  alt = "img" + getRandomString(5),
  ...rest
}: TImgComp) => {
  const ref = useRef<null | HTMLImageElement>(null);

  const onError = (_: React.SyntheticEvent<HTMLImageElement>) => {
    if (ref?.current) {
      ref.current.src = ImagePlaceHolderLink;
      ref.current.srcset = ImagePlaceHolderLink;
    }
  };

  return (
    <img
      ref={ref}
      alt={alt}
      src={src}
      width={width}
      height={height}
      onError={onError}
      {...rest}
    />
  );
};

export type { TImgComp };
export { ImgComp, blurDataURL, ImagePlaceHolderLink };
