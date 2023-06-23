import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();


  async function handleSubmitLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      const userData = { jwt: data.jwt, userName: data.userName };
      setUser(data);
      localStorage.setItem("user", JSON.stringify(userData));
      if (response.status === 400) {
        setError(data.message ? data.message : data);
      }
      if (response.ok && data.jwt && data.role === 1) {
        navigate("/admin");
      } else if (response.ok && data.jwt && data.role === 0) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmitLogin,
    user,
    error,
  };
}

export default useLogin;
