import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import LocalizationWrapper from "./LocalizationWrapper";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationWrapper />
  </StrictMode>
);
