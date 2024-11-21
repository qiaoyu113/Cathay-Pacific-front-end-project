// src/routes/documentRoutes.ts

import express from 'express';
import { getDocuments } from '../controllers/documentController';
import { authenticate } from '../utils/authMiddleware';
import { login } from "../controllers/loginController";


const router = express.Router();

// Protect routes with OAuth authentication
router.get('/documents', authenticate, getDocuments);
router.post("/login", login);

export default router;
