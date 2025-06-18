// "use client";
// import { useEffect } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// type TUseTab = {
//   val: string;
//   list: string[] | { [x: string]: string };
// };

// type RTUseTab = {
//   activeTab: string;
//   activeTabIndex: number;
//   onTabChange: (i: string) => void;
// };
// export const useTabQuery = ({ val, list }: TUseTab): RTUseTab => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);

//   const tabVal = params.get("tab") as string;

//   const handleCurrentActiveTabIndex = () => {
//     if (!tabVal) return 0;
//     if (Array.isArray(list)) {
//       return list?.findIndex((item) => item === tabVal);
//     } else {
//       return Object.keys(list)?.findIndex((item) => item === tabVal);
//     }
//   };

//   const isValidTabVal = (v: string) =>
//     Array.isArray(list) ? list.includes(v) : Object.keys(list).includes(v);

//   const changeUrl = (t: string) => {
//     const activeTab = isValidTabVal(tabVal) ? tabVal : val;
//     if (t === activeTab && activeTab === tabVal) return;
//     params.set("tab", t);
//     router.replace(`${pathname}?${params.toString()}`);
//   };

//   useEffect(() => {
//     if (!isValidTabVal(tabVal)) {
//       changeUrl(val);
//     }
//   }, [tabVal]);

//   const onTabChange = (t: string) => {
//     changeUrl(t);
//   };

//   return {
//     onTabChange,
//     activeTabIndex: handleCurrentActiveTabIndex(),
//     activeTab: tabVal || val,
//   };
// };
