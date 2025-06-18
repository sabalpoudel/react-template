// "use client";
// import { useEffect, useState } from "react";

// import { isLinkRegex } from "..";
// import { GetApi } from "../../api/api";
// import { ChatLink } from "../../api/link";
// import { TScappedData } from "../../api/_interface";

// type TRes = {
//   data: TScappedData;
// };

// type TData = {
//   url: string;
//   site: string;
//   img: string;
//   title: string;
//   description: string;
// };
// export const useGetDataFromLink = (data: string, onlyUrl?: string) => {
//   const [previewData, setPreviewData] = useState<TData | null>(null);

//   useEffect(() => {
//     if (onlyUrl) {
//       parseUrlFetchData(onlyUrl);
//       return;
//     }

//     if (data) {
//       const urls = [...data.matchAll(isLinkRegex)];
//       const url = urls?.[urls?.length - 1]?.[0];
//       if (url) parseUrlFetchData(url);
//     }
//   }, [data]);

//   const parseUrlFetchData = async (url: string) => {
//     try {
//       const previewUrl = `${ChatLink}/link-preview?preview_url=${url}`;
//       const res = await GetApi<TRes>(previewUrl, {
//         arg: {
//           isAuth: false,
//           endpoint: "chat",
//           cache: "force-cache",
//           headers: {
//             Pragma: "max-age=604800",
//             "Cache-Control": "max-age=604800",
//           },
//         },
//       });
//       const d = res?.data;
//       if (d) {
//         setPreviewData({
//           url,
//           title: d?.ogTitle,
//           site: d?.ogSiteName,
//           description: d?.ogDescription,
//           img:
//             (Array.isArray(d?.ogImage)
//               ? d?.ogImage?.[0]?.url
//               : d?.ogImage?.url) ||
//             d?.favicon ||
//             "/assets/images/placeholder-img.png",
//         });
//       }
//     } catch (error) {
//       console.error({ parseUrlFetchDataError: error });
//     }
//   };

//   return previewData;
// };
