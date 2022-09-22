import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserRoles } from "../../../constants/userRoles";

function AuthGuard({ children, allowedRoles = Object.values(UserRoles) }) {
  const location = useLocation();
  const { userAuth } = useSelector((state) => state.userLogin);

  return allowedRoles.includes(userAuth?.role) ? (
    <Outlet />
  ) : userAuth?.id ? (
    <Navigate
      to={{
        pathname: "/unauthorized",
        state: { from: location },
      }}
    />
  ) : (
    <Navigate
      replace
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
}

export default AuthGuard;
