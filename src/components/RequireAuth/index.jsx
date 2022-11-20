import React from "react";
import { Navigate } from "react-router-dom";
import { RootContext } from "../../store/context";
export const RequireAuth = ({ children }) => {
  const {
    state: { loggedIn },
  } = React.useContext(RootContext);
  if (loggedIn) return children;
  return <Navigate to="/auth" replace />;
};
