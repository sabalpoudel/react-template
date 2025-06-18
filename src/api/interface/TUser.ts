type TTranslate = {
  id: number;
  name: string;
  language: string;
};

type TUser = {
  id: number;
  email: string;
  username: string;
  password: string;
  user_type: string;
  updated_at: string;
  created_at: string;
  is_deleted: boolean;
  is_archived: boolean;
  is_followed?: boolean;
  is_email_verified: boolean;
  is_search_enabled: boolean;
  start_business_tutorial_seen: boolean;

  logo?: string;
  image?: string;
  phone?: string;
  user_id?: number;
  zoom_id?: string;
  website?: string;
  timezone?: string;
  about_me?: string;
  features?: string;
  cover_image?: string;
  industry_id?: number;
  industry?: TTranslate;
  country_code?: string;
  contact_name?: string;
  company_name?: string;
  is_superuser?: boolean;
  occupation_id?: number;
  employee_count?: number;
  stripe_account?: string;
  occupation?: TTranslate;
  company_address?: string;
  stripe_account_id?: string;
  stripe_customer_id?: string;
  is_phone_verified?: boolean;
  contact_department?: string;
  company_registration?: string;
  contact_person_image?: string;
  company_name_katakana?: string;
  contact_name_katakana?: string;
};
type TUserData = {
  data: TUserToken & {
    user: TUser;

    is_group_pinned: boolean;
    create_platform: boolean;
    is_profile_complete: boolean;
    group?: { id: number; slug: string };
    stripe_verification_status?: "verified" | "unverified" | "pending";
    partner_dash_status: { status: "not_requested" | "pending" | "accepted" };
  };
};

type TUserSearchData = {
  id: number;
  logo: string;
  email: string;
  image?: string;
  username: string;
  contact_name: string;
  company_name: string;
  is_invitation_sent: boolean;
  contact_person_image: string;
  company_name_katakana: string;
  contact_name_katakana: string;
  group_approval_status: string;
  is_free_invitation_sent: boolean;
  group_invitation_status?: "accepted" | "pending" | "rejected";
};

type TPartnerSearchData = TUserData["data"]["user"];

type TUserGlobalSearch = {
  id: number;
  type: string;
  name: string;
  logo: string;
  email: string;
  image: string;
  phone: string;
  slug?: string;
  username?: string;
  user_type: string;
  has_landing: boolean;
  company_name: string;
  cover_image?: string;
  country_code: string;
  description?: string;
  name_katakana: string;
  company_name_katakana: string;
};

type TUserCookie = {
  id: number;
  email: string;
  username: string;
  logo?: string;
  image?: string;
  phone?: string;
  website?: string;
  timezone?: string;
  cover_image?: string;
  company_name?: string;
  contact_name?: string;
  contact_person_image?: string;
  company_name_katakana?: string;
  contact_name_katakana?: string;
  stripe_account_id?: string;
  zoom_id?: string;
  type?: "individual" | "company";
  start_business_tutorial_seen?: boolean;
};

type TExtraCookie = {
  group: { id: number; slug: string };
  create_platform: boolean;
  is_group_pinned: boolean;
  is_profile_complete: boolean;
  stripe_verification_status?: "verified" | "unverified" | "pending";
  partner_dash_status: { status: "not_requested" | "pending" | "accepted" };
};
type TUserToken = {
  access_token: string;
  refresh_token: string;
};
type TUserRedux = TUserCookie & TExtraCookie;

type TUserFollow = {
  id: number;
  phone: string;
  user_id: number;
  username: string;
  user_type: string;
  created_at: string;
  followed_at: string;
  contact_name: string;
  country_code: string;
  company_name: string;
  is_followed?: boolean;
  company_address: string;
  contact_person_image: string;
  contact_name_katakana: string;
  company_name_katakana: string;
};

export type {
  TUser,
  TUserData,
  TUserSearchData,
  TUserGlobalSearch,
  TPartnerSearchData,
  TUserCookie,
  TExtraCookie,
  TUserRedux,
  TUserToken,
  TUserFollow,
};
