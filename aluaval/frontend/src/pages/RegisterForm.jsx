import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
import NameInput from "../components/NameInput.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import { create } from "../services/dataFetch.js";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isStudent, setAsStudent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let role = isStudent ? "Student" : "Teacher";
      await create("auth/", { name, password, role });
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="w3-container w3-display-middle w3-card w3-round-xxlarge"
      style={{ width: "30%" }}
    >
      <h2 className="w3-center">
        <i className="fa fa-address-book"></i> Register
      </h2>
      <form onSubmit={handleSubmit} className="w3-container">
        <NameInput value={name} onChange={(e) => setName(e.target.value)} />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w3-check"
          type="checkbox"
          checked={isStudent}
          onChange={() => setAsStudent((prev) => !prev)}
        />{" "}
        <label htmlFor="role">Is Student?</label>
        <SubmitButton text="Register" />
        <div className="w3-center">
          <a className="w3-button w3-brown w3-hover-khaki w3-round-xxlarge w3-margin" href="/login">
            Login Here
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
