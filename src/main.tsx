import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import { reduxStore } from "./store/store";
import LocalizationWrapper from "./LocalizationWrapper";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <LocalizationWrapper />
    </Provider>
  </StrictMode>
);
