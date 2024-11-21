import axios from "axios";

// 创建 Axios 实例
const api = axios.create({
  baseURL: "http://localhost:5003/api", // 替换为后端 API 基础路径
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器：动态设置 Authorization 头
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 从 localStorage 获取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
