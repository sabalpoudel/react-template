import { TFileType } from "@utils/fileUtils";

type TFileDetails = {
  url: string;
  id: number;
  name: string;
  type: TFileType;
};

type TFileI = {
  count?: number;
  error?: string;
  loading?: boolean;
  errorInfo?: string;
  subLoading?: boolean;
  loadingInfo?: boolean;
  loadingPlans?: boolean;
  fileList?: Array<TFileRecord> | null;
  storagePlans?: TStoragePlansI[] | null;
  storageDetails?: TStorageDetailRecord | null;
};

type TStorageDetailRecord = {
  id?: number;
  plan: string;
  price?: string;
  users?: number;
  expiry_date?: string;
  used_storage: string;
  total_storage: string;
  used_percentage?: number;
  available_storage: number;
};
type TFileRecord = {
  id: number;
  url?: string;
  user_id: number;
  file_url: string;
  file_size: number;
  file_type: TFileType;
  file_stored_for: string;
  file_original_name: string;
  status?: "deleted" | "not_deleted";
};
type TStorageFiles = TFileDetails;

type TStoragePlansI = {
  unit: string;
  storage: string;
  price: number;
  renew: string;
  label: string;
  users?: number;
};

type TFileActionI = { type: string; payload: TFileI };

type TReqData = {
  count: number;
  rows: TFileRecord[];
};
type TFetchFilesReq = { data: TReqData };
type TFetchStorageInfo = { data: TStorageDetailRecord };

type TSortVal = "0" | "1" | "-1";
type TFetchFilesFilter = {
  offset: number;
  limit?: number;
  search_query: string;
  file_type: TFileType | "all";
  sort_value: TSortVal | "none";
};

export type {
  TFileI,
  TFileRecord,
  TFileActionI,
  TFileDetails,
  TStorageFiles,
  TStoragePlansI,
  TFetchFilesReq,
  TFetchFilesFilter,
  TFetchStorageInfo,
  TStorageDetailRecord,
};
