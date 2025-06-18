import clsx from "clsx";
import s from "./DangerouslySetInnerHTML.module.css";
// Type for the HTML markup object
type MarkupObject = {
  __html: string;
};

// Function to create HTML markup
const createMarkup = (description: string): MarkupObject => {
  return { __html: description };
};

export const DangerouslySetInnerHTML: React.FC<{
  className?: string;
  description?: string;
}> = ({ description, className }) => {
  return (
    <div
      className={clsx(className, s.desc)}
      dangerouslySetInnerHTML={createMarkup(description || "")}
    />
  );
};
