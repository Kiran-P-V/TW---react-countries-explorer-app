import "./App.css";
import type { ReactElement } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function RequireAuth({ children }: { children: ReactElement }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
