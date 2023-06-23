import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { user, decodedToken } = useAuth();
  const checkUserToken = () => {
    try {
      const storedToken = localStorage.getItem("user");
      if (
        !user ||
        !decodedToken ||
        (decodedToken.role === 0 &&
          JSON.parse(storedToken)?.jwt !== decodedToken)
      ) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [user, decodedToken]);
  return <>{decodedToken ? props.children : null}</>;
};
export default ProtectedRoute;
