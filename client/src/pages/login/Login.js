import { useContext, useState } from "react";
import axios from "axios";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginInput = (event) => {
    setCredentials((previous) => {
      return { ...previous, [event.target.id]: event.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }

      const resData = await response.json();
      dispatch({ type: "LOGIN_SUCCESS", payload: resData.data.details });
      navigate("/");
    } catch (error) {
    
      dispatch({ type: "LOGIN_FAILURE", payload: error.response });
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: "LOGIN_START" });
  //   try {
  //     const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
  //     dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
  //     navigate("/")
  //   } catch (err) {
  //     dispatch({ type: "LOGIN_FAILURE", payload: err.response });
  //   }
  // };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleLoginInput}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleLoginInput}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="loginBtn">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};
export default Login;
