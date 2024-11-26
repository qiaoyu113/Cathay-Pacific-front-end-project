import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 引入 useNavigate
import api from "../utils/api"; // 引入自定义的 api 实例
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null); // 清除错误信息
      const response = await api.post("/login", { username, password }); // 使用 api 发送请求

      // 存储 token 到 localStorage
      localStorage.setItem("token", response.data.token);

      alert("Login successful!");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
