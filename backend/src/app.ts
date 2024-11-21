// src/app.ts

import express from 'express';
import documentRoutes from './routes/documentRoutes';
import cors from "cors";

const app = express();


// 配置 CORS
app.use(
    cors({
      origin: "http://localhost:3000", // 允许的前端地址
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 允许的 HTTP 方法
      credentials: true, // 是否允许发送 Cookie 或其他凭证信息
    })
  );
  

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', documentRoutes);

export default app;
