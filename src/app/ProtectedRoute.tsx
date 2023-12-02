import { tokenService } from "business/shared/TokenService";
import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  children: ReactNode;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const accessToken = tokenService.getLocalAccessToken();

  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};
