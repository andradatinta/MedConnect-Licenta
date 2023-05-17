import { React, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole, ...rest }) {
  const { user, loggedIn } = useContext(AuthContext);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.type !== requiredRole) {
    return <Navigate to="/" />; // or to some "Access Denied" page
  }

  return <Route {...rest}>{children}</Route>;
}

export default ProtectedRoute;
