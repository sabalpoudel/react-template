import { Routes, Route } from "react-router";
import { HomePage } from "./pages/Home";

export default function App({ locale, onLocaleChange }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage locale={locale} onLocaleChange={onLocaleChange} />}
      />
    </Routes>
  );
}
