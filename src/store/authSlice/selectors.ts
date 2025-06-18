/* Instruments */

/* Instruments */
import type { ReduxState } from "../store";

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userSelector = (state: ReduxState) => state.auth.user;
export const userTokenSelector = (state: ReduxState) => state.auth.token;
export const isAuthModalOpenIdSelector = (state: ReduxState) =>
  state.auth.isAuthModalOpen;
export const userIdSelector = (state: ReduxState) => state.auth.user?.id;
