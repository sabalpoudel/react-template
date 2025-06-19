import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import App from "./App";
import { reduxStore } from "./store/store";
import LocalizationWrapper from "./LocalizationWrapper";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <LocalizationWrapper>
        <App />
      </LocalizationWrapper>
    </Provider>
  </StrictMode>
);
