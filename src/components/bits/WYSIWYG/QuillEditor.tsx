// "use client";
// import dynamic from "next/dynamic";
// import { forwardRef, Ref, Suspense } from "react";
// import { useLocale } from "next-intl";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// // const Section2 = dynamic(
// //   () => import("./Section2").then((mod) => ({ default: mod.Section2 })),
// //   { ssr: false }
// // );

// import "react-quill/dist/quill.snow.css";
// import { removeHTMLTags, useIsMounted } from "../../../_utils";

// type TReactQuill = typeof ReactQuill;

// // Define the props type
// type TQuillEditor = {
//   value?: string;
//   modules?: any;
//   className?: string;
//   disabled?: boolean;
//   formats?: string[];
//   placeholder?: string;
//   defaultValue?: string;
//   hideToolbar?: boolean;
//   ref?: Ref<TReactQuill>;
//   preserveWhitespace?: boolean;
//   onChange?: (content: string) => void;
// };

// export type { TQuillEditor };

// // Define default values for props
// const defaultProps: TQuillEditor = {
//   value: "",
//   onChange: () => {},
//   modules: {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "link"],
//       [{ list: "ordered" }, { list: "bullet" }],
//     ],
//   },
//   formats: ["header", "bold", "italic", "list", "bullet", "link"],
// };

// const QuillEditor = forwardRef<TReactQuill, TQuillEditor>((props, ref) => {
//   const isMounted = useIsMounted();
//   const lang = useLocale();
//   // Destructure props
//   const {
//     value,
//     onChange,
//     modules,
//     formats,
//     className,
//     hideToolbar = false,
//     ...rest
//   } = {
//     ...defaultProps,
//     ...props,
//   };

//   const hideToolbarCn = hideToolbar ? "cus-quill-hide-toolbar" : "";

//   // Function to handle changes in the Quill editor
//   const handleQuillChange = (v: string) => {
//     // Remove all HTML tags
//     const val = removeHTMLTags(v);
//     // If after removing all HTML tags, its value is empty, set it as empty
//     if (val === "") {
//       onChange?.(val);
//       return;
//     }
//     onChange?.(v);
//   };

//   if (!isMounted) return <></>;

//   return (
//     <Suspense>
//       <ReactQuill
//         ref={ref}
//         value={value}
//         modules={modules}
//         formats={formats}
//         onChange={handleQuillChange}
//         className={`quill-${lang} cus-quill ${className} ${hideToolbarCn}`}
//         {...rest}
//       />
//     </Suspense>
//   );
// });

// QuillEditor.displayName = "QuillEditor";

// export { QuillEditor };
