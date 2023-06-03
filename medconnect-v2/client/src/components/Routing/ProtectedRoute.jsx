import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const { user, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else if (requiredRole && (!user || user.type !== requiredRole)) {
      navigate("/");
    }
  }, [loggedIn, user, requiredRole, navigate]);

  if (!loggedIn || (requiredRole && (!user || user.type !== requiredRole))) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
