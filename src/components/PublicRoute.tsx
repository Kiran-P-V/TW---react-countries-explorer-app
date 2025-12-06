import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
