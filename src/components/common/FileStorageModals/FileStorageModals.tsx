// import React from "react";
// import { useTranslations } from "next-intl";
// import { useDispatch, useSelector } from "react-redux";

// import { Typography } from "@mui/material";

// import { Spinner } from "@components/bits/Spinner";
// import { ButtonComp } from "@components/bits/Button";
// import { ModalComp, TModalType } from "@components/bits/Modal/Modal";
// import { FileRelatedModalsWrapper } from "./FileRelatedModalsWrapper";

// import { toggleFileRelatedModal } from "@store/extraSlice";
// import { TFileRelatedModal } from "@store/extraSlice/initState";
// import { fileRelatedModalSelector } from "@store/extraSlice/selectors";

// import { SnackBar, useIsMounted } from "@utils/index";
// import { useCallDeleteFile } from "@api/helpers/storage/useCallDeleteFile";

// type TMType = Exclude<TFileRelatedModal, null>["mType"];

// const ModalType: { [key in TMType]: TModalType } = {
//   delete: "delete",
// };

// type TProps = {
//   onSuccess?: (v: string) => void;
// };

// export const FileStorageModals = (props: TProps) => {
//   const { onSuccess } = props;
//   const dispatch = useDispatch();
//   const isMounted = useIsMounted();
//   const t = useTranslations("Shared");

//   const fileModal = useSelector(fileRelatedModalSelector);
//   const mModalType = fileModal?.mType;

//   const handleOnsuccess = () => {
//     const message = t("file_deleted", { file: fileModal?.name });
//     SnackBar({ message, doNotTranslate: true }, "success");
//     closeModal();
//     onSuccess?.("delete");
//   };

//   const { loading, callDeleteFile } = useCallDeleteFile({
//     platformId: fileModal?.platformId,
//     onSuccess: handleOnsuccess,
//   });

//   const closeModal = () => {
//     dispatch(toggleFileRelatedModal(null));
//   };

//   const Title: { [key in TMType]: string } = {
//     delete: t("delete_file"),
//   };

//   const handleOnDelete = () => {
//     callDeleteFile({
//       data: { file_ids: [fileModal?.id] },
//     });
//   };

//   if (!isMounted) return null;

//   const title = mModalType ? Title[mModalType] : undefined;
//   const modalType = mModalType ? ModalType[mModalType] : undefined;

//   return (
//     <ModalComp
//       closeIcon
//       title={title}
//       noIcon={false}
//       onClose={closeModal}
//       modalType={modalType}
//       open={Boolean(mModalType)}
//       actions={
//         <>
//           {mModalType === "delete" && (
//             <>
//               <ButtonComp
//                 color="error"
//                 sx={{ flex: 2 }}
//                 disableElevation
//                 isLoading={loading}
//                 variant="contained"
//                 onClick={handleOnDelete}
//               >
//                 {t("delete")}
//               </ButtonComp>
//               <ButtonComp
//                 sx={{ flex: 1 }}
//                 color="secondary"
//                 disableElevation
//                 variant="contained"
//                 onClick={closeModal}
//               >
//                 {t("cancel")}
//               </ButtonComp>
//             </>
//           )}
//         </>
//       }
//     >
//       <FileRelatedModalsWrapper className="mcr-mw">
//         {mModalType === "delete" && (
//           <>
//             <Typography align="left" gutterBottom>
//               {t("are_you_sure_you_want_to_delete", { file: fileModal?.name })}
//             </Typography>
//           </>
//         )}
//         {loading && <Spinner size={32} />}
//       </FileRelatedModalsWrapper>
//     </ModalComp>
//   );
// };
