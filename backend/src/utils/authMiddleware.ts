// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token || token !== 'Bearer mock-token') {
    res.status(401).json({ message: 'Unauthorized' });
    return; // Ensure the function exits after sending the response
  }

  next(); // Call the next middleware or route handler
};
