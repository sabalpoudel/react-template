import { Routes, Route } from "react-router";

import { HomePage } from "./pages/Home";
import { AppWrapper } from "./AppWrapper";

export default function App() {
  return (
    <AppWrapper className="app-wrapper">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </AppWrapper>
  );
}
