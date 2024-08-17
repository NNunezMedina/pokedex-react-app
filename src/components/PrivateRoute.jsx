import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth-Context";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/pokedex-react-app/" replace />;
  }

  return children;
};

export default PrivateRoute;
