// "use client";
// import { useTranslations } from "next-intl";
// import React, { useState } from "react";

// import { Alert, Typography } from "@mui/material";
// import { Link } from "@translations/routing";

// import { FileList } from "./FileList";
// import { FileStorageInfo } from "./FileStorageInfo";
// import { EmptyArea } from "@components/bits/EmptyArea";
// import { FileStorageFilter } from "./FileStorageFilter";
// import { FileStorageWrapper } from "./FileStorageWrapper";
// import { FileStorageAddButton } from "./FileStorageAddButton";
// import { FilesSkeleton } from "@components/bits/Skeleton/FilesSkeleton";
// import { PaginationComp } from "@components/bits/Pagination/PaginationComp";

// import { SnackBar, useDebounce, waitMinutes } from "@utils/index";
// import { TPlatform } from "@api/_interface";
// import { TableConfig } from "@config/config";
// import { useFetchFiles } from "@api/helpers/storage/useFetchFiles";
// import { TFetchFilesFilter, TFetchFilesReq } from "@api/_interface/TStorage";
// import { useFetchStorageInfo } from "@api/helpers/storage/useFetchStorageInfo";
// import { useCallUpdateFileName } from "@api/helpers/storage/useCallUpdateFileName";
// import { FileStorageModals } from "./FileStorageModals/FileStorageModals";
// import { useDispatch } from "react-redux";
// import { toggleFileRelatedModal } from "@store/extraSlice";

// const perPage = TableConfig.defaultPerPage * 2;
// type TProps = {
//   platform?: TPlatform;
//   files: TFetchFilesReq;
// };

// const defFilter: TFetchFilesFilter = {
//   offset: 0,
//   limit: perPage,
//   search_query: "",
//   file_type: "all",
//   sort_value: "none",
// };

// export const FileStoragePageComp = (props: TProps) => {
//   const { files, platform } = props;
//   const dispatch = useDispatch();
//   const t = useTranslations("Shared");

//   const [filter, setFilter] = useState(defFilter);
//   const [fileId, setFileId] = useState<number[]>([]);
//   const debouncedSearchQuery = useDebounce(filter.search_query) as string; // Debounce only the search_query

//   // Update debounced filter when debounced search query changes
//   const effectiveFilter = {
//     ...filter,
//     search_query: debouncedSearchQuery, // Use debounced search_query here
//   };

//   // Fetch storage info and files based on effectiveFilter state
//   const {
//     data,
//     mutate: mutateStorageInfo,
//     loading: loadingStorageInfo,
//   } = useFetchStorageInfo({});

//   const {
//     list,
//     count = 0,
//     mutate: mutateFiles,
//     loading: loadingFiles,
//   } = useFetchFiles({
//     filter: {
//       ...effectiveFilter,
//       offset: effectiveFilter.offset * perPage,
//       file_type:
//         effectiveFilter.file_type === "all"
//           ? undefined
//           : effectiveFilter.file_type,
//       sort_value:
//         effectiveFilter.sort_value === "none"
//           ? undefined
//           : effectiveFilter.sort_value,
//     },
//     files,
//   });

//   const handleUpdateFileNameSuccess = () => {
//     // console.log("ddd");
//     // mutateFiles();
//     SnackBar({ message: "file_name_updated" }, "success");
//   };

//   const { loading: reNameLoading, callUpdateFileName } = useCallUpdateFileName({
//     fileId: fileId[0],
//     platformId: platform?.id,
//     onSuccess: handleUpdateFileNameSuccess,
//   });

//   // Handles filter changes and resets offset for new searches
//   const handleChangeFilter = (
//     value: string | number,
//     key: keyof TFetchFilesFilter
//   ) => {
//     setFilter((prev) => ({
//       ...prev,
//       offset: key === "search_query" ? 0 : prev.offset, // Reset offset on new search
//       [key]: value,
//     }));
//   };

//   // Callback to refresh files and storage info on file addition
//   const handleFetchAgain = () => {
//     mutateFiles();
//     mutateStorageInfo();
//   };

//   const isAdmin = platform?.role === "admin";
//   const storageLink = platform?.id ? `my-platform/${platform?.slug}/` : "";
//   const showAddButton = platform?.id ? platform?.role !== null : true;
//   const userExceedPlan =
//     platform?.id && data?.users ? platform?.total_member > data?.users : false;

//   const handleEditFileName =
//     (id: number, _: number) => async (name: string) => {
//       setFileId([id]);
//       const data = { name };
//       await waitMinutes(500);
//       callUpdateFileName({ data });
//     };

//   const handleDeletingFile = (id: number, n: string) => {
//     if (!id) {
//       SnackBar({ message: "error_deleting_file" }, "error");
//       return;
//     }
//     setFileId([id]);
//     dispatch(
//       toggleFileRelatedModal({
//         id,
//         name: n,
//         platformId: platform?.id,
//         mType: "delete",
//       })
//     );
//     // openDeleteModal();
//   };

//   const loading = loadingStorageInfo || loadingFiles || reNameLoading;

//   const handleOnSuccess = (v: string) => {
//     if (v === "delete") handleFetchAgain();
//   };
//   return (
//     <FileStorageWrapper className="fsw">
//       <Typography
//         variant="h5"
//         gutterBottom
//         component="h1"
//         color="secondary"
//         className="fsw-header"
//       >
//         <u>{t("file_storage")}</u>
//         <FileStorageInfo loading={loadingStorageInfo} data={data} />
//       </Typography>

//       <FileStorageFilter
//         filter={filter}
//         className="fsw-filter"
//         changeFilter={handleChangeFilter}
//       />

//       {(!platform?.id || isAdmin) && (
//         <Link href={`/app/${storageLink}settings?update=storage`}>
//           <Typography variant="body2" color="textSecondary" gutterBottom>
//             {t("you_can_change_your_storage_plans_from_here")}
//           </Typography>
//         </Link>
//       )}

//       {userExceedPlan && (
//         <Alert severity="error" className="fsw-alert">
//           <Typography variant="body2" color="error">
//             {t("user_exceed_upgrade_plan")}
//           </Typography>
//         </Alert>
//       )}

//       {showAddButton && !userExceedPlan && (
//         <FileStorageAddButton
//           className="fsw-choose-file"
//           onAddFileSuccess={handleFetchAgain}
//         />
//       )}

//       {loadingFiles && <FilesSkeleton size={200} />}

//       {list && !loadingFiles && (
//         <FileList
//           list={list}
//           fileId={fileId}
//           loading={loading}
//           platform={platform}
//           className="fsw-list"
//           canOnlySelect={false}
//           fileLoading={reNameLoading}
//           deleteAFile={handleDeletingFile}
//           editFileName={handleEditFileName}
//         />
//       )}

//       {count === 0 && !loadingFiles && <EmptyArea className="fsw-empty-area" />}

//       {count > perPage && (
//         <PaginationComp
//           perPage={perPage}
//           page={filter.offset}
//           setPerPage={() => {}}
//           className="fsw-pagination"
//           totalCount={Math.ceil(count / perPage)}
//           setPage={(page) => handleChangeFilter(page - 1, "offset")}
//         />
//       )}

//       <FileStorageModals onSuccess={handleOnSuccess} />
//     </FileStorageWrapper>
//   );
// };
