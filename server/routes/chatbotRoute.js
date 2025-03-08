import express from "express";
const router = express.Router();
import { getChatResponse } from "../controller/chatbotController.js"; // Corrected path

router.post("/", getChatResponse);

export default router;
