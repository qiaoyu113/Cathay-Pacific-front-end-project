import { Request, Response } from "express";

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  // 模拟的用户名和密码验证
  if (username === "admin" && password === "123") {
    res.json({ token: "mock-token" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};
