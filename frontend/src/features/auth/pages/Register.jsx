import "../styles/register.scss";
import FormGroup from "../components/FormGroup";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

import { useNavigate } from "react-router";

const Register = () => {

    const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    await handleRegister({ username, email, password });

    navigate("/home")
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <FormGroup
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            placeholder="Enter your username"
          />
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
          <button type="submit">Register</button>
        </form>
        <p className="link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
