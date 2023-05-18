import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const { user, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!loggedIn) {
    navigate("/login");
    return null;
  }

  if (requiredRole && user.type !== requiredRole) {
    navigate("/");
    return null;
  }

  return children;
}

export default ProtectedRoute;
