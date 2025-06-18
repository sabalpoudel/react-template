import type { TUserRedux, TUserToken } from "@api/interface";

// declaring the types for our state
type TState = {
  error?: any;
  loading: boolean;
  token: TUserToken | null;
  user?: TUserRedux | null;
  isAuthModalOpen?: boolean;
};
const initialState: TState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  isAuthModalOpen: false,
};
export default initialState;
