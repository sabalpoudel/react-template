type TSubscriptionBased =
  | "fan-based"
  | "subscription-based"
  | "online-salon-based";
type TCommissionBased = "tourism-based" | "commission-based";
type TCorporateBased = "corporate" | "shop-based";
type TVolunteerBased =
  | "volunteer"
  | "online-exhibit"
  | "industry-exchange-based";

type TPlatformCategory =
  | TSubscriptionBased
  | TCommissionBased
  | TCorporateBased
  | TVolunteerBased;

type TPlatform = {
  approval_status: string;
  can_apply_for_online_meetings: boolean;
  can_post_blog: boolean;
  can_post_job: boolean;
  can_post_post: boolean;
  can_post_sale: boolean;
  can_post_service: boolean;
  can_post_webinar: boolean;
  can_create_platform?: boolean;
  category: TPlatformCategory;
  commission?: null | number;
  coupon_invite_member: boolean;
  coupon_join_platform: boolean;
  coupon_post_in_platform: boolean;
  description: string;
  group_chat_id?: null | number;
  group_invitation_id?: null | number;
  group_invitation_status?: null | string;
  group_is_free_subscription?: null | boolean;
  has_landing: boolean;
  has_partner: boolean;
  id: number;
  image: string;
  inquire_button: boolean;
  is_blog_default_view: boolean;
  is_chat_enabled: boolean;
  is_storage_enabled?: null | boolean;
  name: string;
  notification_id?: null | number;
  notification_seen_status?: null | string;
  product_category_ids: number[];
  require_post_approval: boolean;
  role: string;
  show_archive: boolean;
  show_blog: boolean;
  show_job: boolean;
  show_member: boolean;
  show_podcast: boolean;
  show_post: boolean;
  show_sale: boolean;
  show_service: boolean;
  show_webinar: boolean;
  slug: string;
  subscription_end_date?: null | string;
  subscription_price: number;
  subscription_start_date?: null | string;
  subscription_type: string;
  token: string;
  total_member: number;
  type: TPlatformCategory;
  user_id: number;

  updated_at: string;
  created_at: string;
  is_archived: boolean;
  public_view: boolean;
  send_notification_to_all: boolean;
  stripe_subscription_plan?: null | string;
  stripe_subscription_product?: null | string;
  admin?: {
    name: string;
    id: number;
    username: string;
    email: string;
    image: string;
  };
};

type TPlatformRequest = TPlatform & { platform_request_id: number };
type TPlatformRequestModal = TPlatformRequest & { status: "accept" | "reject" };
type TGroupApprovalStatus = "pending" | "approved" | "declined";

type TPlatformInchargeDetail = {
  id: number;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  user_id: number;
  group_id: number;
};
type TMyPlatform = {
  id: number;
  name: string;
  slug: string;
  category: string;
  platform_incharge_details: TPlatformInchargeDetail[];
};

export type {
  TPlatform,
  TMyPlatform,
  TVolunteerBased,
  TCorporateBased,
  TCommissionBased,
  TPlatformRequest,
  TSubscriptionBased,
  TGroupApprovalStatus,
  TPlatformRequestModal,
  TPlatformCategory,
};
