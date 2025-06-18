// "use client";
// import { Typography } from "@mui/material";
// import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";

// import { ButtonComp } from "./Button";
// import { EmptyAreaIcon } from "../_icons";
// import { EmptyAreaWrapper } from "./EmptyAreaWrapper";

// type EmptyAreaProps = {
//   title?: string;
//   goBack?: boolean;
//   subtitle?: string;
//   iconWidth?: string;
//   className?: string;
//   doNotTranslate?: boolean;
// };

// export const EmptyArea: React.FC<EmptyAreaProps> = ({
//   goBack,
//   className = "",
//   iconWidth = "400px",
//   doNotTranslate = false,
//   title = "empty_area_title",
//   subtitle = "empty_area_subtitle",
// }: EmptyAreaProps) => {
//   const router = useRouter();
//   const e = useTranslations("Empty");

//   const t = doNotTranslate ? title : e(title);
//   const st = doNotTranslate ? subtitle : e(subtitle);

//   const continueExploring = () => {
//     if (window) {
//       const length = window?.history?.length || 1;
//       if (length > 1) {
//         router.back();
//         return;
//       }
//     }
//     router.push("/dashboard");
//   };

//   return (
//     <EmptyAreaWrapper className={className + " eaw"} iconWidth={iconWidth}>
//       <div className="eaw-container">
//         <Typography
//           variant="h6"
//           gutterBottom
//           component="h2"
//           className="eaw-container-h2"
//         >
//           {t}
//         </Typography>
//         {st && (
//           <Typography
//             gutterBottom
//             component="h3"
//             color="textSecondary"
//             className="eaw-container-h3"
//           >
//             {st}
//           </Typography>
//         )}
//         <EmptyAreaIcon className="eaw-container-icon" />
//         {goBack && (
//           <div className="eaw-container-goBack">
//             <br />
//             <ButtonComp
//               variant="outlined"
//               onClick={continueExploring}
//               className="eaw-container-goBack-btn"
//             >
//               {e("continue_exploring")}
//             </ButtonComp>
//           </div>
//         )}
//       </div>
//     </EmptyAreaWrapper>
//   );
// };
