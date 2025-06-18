// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import { useTranslations } from "next-intl";
// import { Button, Typography } from "@mui/material";

// import {
//   ViewLargeFilesSliderWrapper,
//   ViewLargeFilesSliderContentWrapper,
// } from "./ViewLargeFilesSliderWrapper";
// import { CustomSwiper } from "@components/bits/Swiper/SwiperComp";
// import { FullscreenDialog } from "@components/bits/Modal/FullscreenDialog/FullscreenDialog";

// import { TFileDetails } from "@api/_interface";
// import { FileTypeIcons } from "./FileTypeIcons";
// import { parseFileDetails } from "@utils/fileUtils";
// import { FullPdfViewerComp } from "@components/bits/FileComp/FullPdfViewerComp";
// import { FullDocViewerComp } from "@components/bits/FileComp/FullDocViewerComp";

// type TProps = {
//   className?: string;
//   children: React.ReactNode;
//   files: (string | TFileDetails)[];
// };

// export const ViewLargeFilesSlider = (props: TProps) => {
//   const { files, className, children } = props;

//   const [openModal, setOpenModal] = useState(false);
//   const openSetOpenModal = () => {
//     setOpenModal(true);
//   };
//   const closeSetOpenModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <>
//       <ViewLargeFilesSliderWrapper
//         onClick={openSetOpenModal}
//         className={"vlf-sw " + className}
//       >
//         {children}
//       </ViewLargeFilesSliderWrapper>
//       <FullscreenDialog
//         open={openModal}
//         enableBackdropClose={false}
//         onDialogClose={closeSetOpenModal}
//       >
//         {openModal && <ViewLargeFilesSliderContent files={files} />}
//       </FullscreenDialog>
//     </>
//   );
// };

// type TViewLargeFilesSliderContent = {
//   files: (string | TFileDetails)[];
//   initialSlide?: number;
// };
// const ViewLargeFilesSliderContent = (props: TViewLargeFilesSliderContent) => {
//   const { files, initialSlide = 0 } = props;

//   return (
//     <ViewLargeFilesSliderContentWrapper className="vlf-sw-modal-content">
//       <CustomSwiper
//         scrollbar
//         pagination
//         navigation
//         slidesPerView={1}
//         initialSlide={initialSlide}
//         className="vlf-sw-modal-content-swiper"
//         slides={files.map((file, j) => (
//           <div
//             key={`file-${j + 1}`}
//             className="vlf-sw-modal-content-swiper-item"
//           >
//             <RenderSlideContent file={file} />
//           </div>
//         ))}
//       />
//     </ViewLargeFilesSliderContentWrapper>
//   );
// };

// const RenderSlideContent = ({ file }: { file: string | TFileDetails }) => {
//   const { url, type, name, title } = parseFileDetails(file);
//   const t = useTranslations("Shared");

//   if (type === "image") {
//     return (
//       <div title={name} className="vlf-sw-modal-content-swiper-item-image">
//         <Image src={url} alt="Image" layout="fill" objectFit="contain" />
//       </div>
//     );
//   } else if (type === "pdf") {
//     return <FullPdfViewerComp url={url} />;
//   } else if (type === "docx" || type === "pptx" || type === "xlsx") {
//     return <FullDocViewerComp url={url} />;
//   } else {
//     const IconComponent = FileTypeIcons[type] || FileTypeIcons["other"];

//     return (
//       <div title={name} className="vlf-sw-modal-content-swiper-item-file">
//         {title && (
//           <Typography variant="body2" align="center" color="white">
//             {title}
//           </Typography>
//         )}
//         <IconComponent color="primary" sx={{ fontSize: 100 }} />
//         <Button
//           download
//           fullWidth
//           href={url}
//           component="a"
//           target="_blank"
//           disableElevation
//           variant="contained"
//           rel="noopener noreferrer"
//           className="vlf-sw-modal-content-swiper-item-file-button"
//         >
//           {t("download_file")}
//         </Button>
//       </div>
//     );
//   }
// };
