import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { user, decodedToken } = useAuth();
  const checkUserToken = () => {
    if (!user || decodedToken.role === 0) {
      return navigate("/login");
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [user]);
  return <>{decodedToken ? props.children : null}</>;
};
export default ProtectedRoute;
