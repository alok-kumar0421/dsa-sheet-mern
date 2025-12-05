import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onSubmit, user }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password, isRegister, name);
  };

  return (
  <div className="login-wrapper">   {/* <-- ye add karo */}
    <div className="login-card">
      <h2>{isRegister ? "Register (Student)" : "Login (Student)"}</h2>

      {isRegister && (
        <>
          <label>Name</label>
          <input
            type="text"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </>
      )}

      <label>Email</label>
      <input
        type="email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleSubmit}>
        {isRegister ? "Register & Login" : "Login"}
      </button>

      <button
        className="register-btn"
        onClick={() => setIsRegister((prev) => !prev)}
      >
        {isRegister ? "Already have account? Login" : "New user? Register"}
      </button>
    </div>
  </div>
);
};

export default LoginPage;
