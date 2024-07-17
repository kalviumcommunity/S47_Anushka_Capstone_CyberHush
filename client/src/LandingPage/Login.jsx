import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        Email: email,
        Password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const loginWithGoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };

  return (
    < div className={styles.containermain}>
    <div className={styles.container3}>
      <form className={styles.registrationForm} onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.buttonlogin}>
          Login
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className={styles.or}>
          <span>or</span>
        </p>
        <button className={styles.GoogleButton} onClick={loginWithGoogle}>
          Sign In With Google
        </button>
      </form>
    </div>
    </div>
  );
}

export default Login;
