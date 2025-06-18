// "use client";
// import clsx from "clsx";
// import React, { JSX, Suspense } from "react";
// import { FormHelperText, Typography } from "@mui/material";

// import { QuillEditor, TQuillEditor } from "./QuillEditor";
// import { QuillEditorFieldWrapper } from "./QuillEditorFieldWrapper";

// type TQuillEditorField = {
//   id: string;
//   label?: string;
//   error?: boolean;
//   minRows?: number;
//   maxRows?: number;
//   className?: string;
//   helperText?: string;
//   placeholder?: string;
//   endIcon?: JSX.Element;
//   color?: "primary" | "";
//   startIcon?: JSX.Element;
//   labelClassName?: string;
//   inputClassName?: string;
//   errorClassName?: string;
//   helperClassName?: string;
//   quillProps?: TQuillEditor;
//   labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
//   helperProps?: React.HTMLAttributes<HTMLParagraphElement>;
// };

// const QuillEditorField = React.forwardRef(
//   (
//     {
//       id = "",
//       endIcon,
//       startIcon,
//       label = "",
//       color = "",
//       error = false,
//       className = "",
//       helperText = "",
//       placeholder = "",
//       labelClassName = "",
//       inputClassName = "",
//       errorClassName = "",
//       helperClassName = "",
//       labelProps = {},
//       helperProps = {},
//       quillProps,
//     }: TQuillEditorField,
//     ref: React.Ref<HTMLDivElement>
//   ) => {
//     const { disabled } = quillProps || {};

//     const borderColorCn = disabled
//       ? "qe-fw-div-quill-border-disabled"
//       : error
//       ? "qe-fw-div-quill-border-error"
//       : color === "primary"
//       ? "qe-fw-div-quill-border-primary"
//       : "";

//     return (
//       <QuillEditorFieldWrapper ref={ref} className={clsx("qe-fw", className)}>
//         <Suspense>
//           {label && (
//             <Typography
//               component="label"
//               color="textSecondary"
//               htmlFor={id}
//               className={clsx("qe-fw-label", labelClassName, {
//                 "qe-fw-label-error": error,
//               })}
//               {...labelProps}
//             >
//               {label}
//             </Typography>
//           )}
//           <div className="qe-fw-div">
//             {startIcon && (
//               <div className="qe-fw-div-icon-start">{startIcon}</div>
//             )}
//             <QuillEditor
//               className={clsx(
//                 "qe-fw-div-quill c-scrollbar",
//                 borderColorCn,
//                 inputClassName,
//                 {
//                   "qe-fw-div-quill-icon-end": Boolean(endIcon),
//                   "qe-fw-div-quill-icon-start": Boolean(startIcon),
//                 }
//               )}
//               placeholder={placeholder}
//               {...quillProps}
//             />
//             {endIcon && <div className="qe-fw-div-icon-end">{endIcon}</div>}
//           </div>
//           {helperText && (
//             <FormHelperText
//               error={error}
//               className={clsx(
//                 "qe-fw-helper",
//                 error ? errorClassName : helperClassName
//               )}
//               {...helperProps}
//             >
//               {helperText}
//             </FormHelperText>
//           )}
//         </Suspense>
//       </QuillEditorFieldWrapper>
//     );
//   }
// );
// QuillEditorField.displayName = "QuillEditorField";
// export { QuillEditorField };
