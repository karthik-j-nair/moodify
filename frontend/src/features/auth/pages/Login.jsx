import React, { useState } from "react";
import "../styles/login.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    await handleLogin({ email, password });

    navigate("/home");
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Enter your email"
          />
          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
          />
          <button type="submit">Login</button>
        </form>
        <p className="link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
