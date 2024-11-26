import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AppContent from "./components/AppContent"; // 主内容页面

const App: React.FC = () => {
  // 判断是否存在 token
  const isAuthenticated = !!localStorage.getItem("token");

  return (
      <Routes>
        {/* 登录页面 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 主页面 */}
        <Route
          path="/"
          element={isAuthenticated ? <AppContent /> : <Navigate to="/login" />}
        />

        {/* 404 页面重定向 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
};

export default App;
