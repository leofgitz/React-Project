import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../components/EmailInput.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import { useAuth } from "../context/authProvider.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      className="w3-container w3-display-middle w3-card w3-round-xxlarge"
      style={{ width: "30%" }}
    >
      <h2 className="w3-center">
        {" "}
        <i className="fa fa-address-book"></i> Login
      </h2>
      <form onSubmit={handleSubmit} className="w3-container">
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton text="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
