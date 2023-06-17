import { decodeToken } from "react-jwt";
import useLocalStorage from "./useLocalStorage";

function useAuth() {
  const { user } = useLocalStorage();
  const decodedToken = decodeToken(user?.jwt);

  return { user, decodedToken };
}

export default useAuth;
