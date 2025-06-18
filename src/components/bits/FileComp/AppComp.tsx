import { getStringFromUri } from "../../../_utils";
import { AvatarComp } from "./Avatar";
// import { PdfComp } from "./PdfComp";

type TAppComp = React.AnchorHTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
};

const AppComp: React.FC<TAppComp> = ({ src = "", alt, ...rest }) => {
  const title = alt || getStringFromUri(src);
  // const isPdf = isPdfUrl(src);

  return (
    <div className="w-full text-center" {...rest}>
      {/* {isPdf ? (
        <PdfComp pdfUrl={src} title={title} />
      ) : (
        )} */}
      <AvatarComp src={src} alt={alt} title={title} className="mx-auto" />
    </div>
  );
};

export type { TAppComp };
export { AppComp };
