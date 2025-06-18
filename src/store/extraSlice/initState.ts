type TFileRelatedModalType = "delete";

type TFile = { id: number; name: string; platformId?: number };

type TExtraState = {
  rightModalType: "BTM1" | "BTM2" | "invite" | "platform" | null;
  fileRelatedModal: (TFile & { mType: TFileRelatedModalType }) | null;
};

type TRightModalType = TExtraState["rightModalType"];
type TFileRelatedModal = TExtraState["fileRelatedModal"];

export type { TExtraState, TRightModalType, TFileRelatedModal };

const initialState: TExtraState = {
  rightModalType: null,
  fileRelatedModal: null,
};

export default initialState;
