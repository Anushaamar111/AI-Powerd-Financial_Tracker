import express from "express";
import { getExpenseSuggestions } from "../utils/gemini.js";
import authenticateUser from "../middlewares/authMiddleware.js";
import Expense from "../models/expense.js";
const router = express.Router();

router.post("/suggestions", authenticateUser, async (req, res) => {
  try {
    const { income, budget } = req.body;
    const userId = req.user.id;

    const suggestions = await getExpenseSuggestions(income, budget, userId);
    res.json({ suggestions });
  } catch (error) {
    console.error("Error getting suggestions:", error);
    res.status(500).json({ message: error.message });
  }
});


export default router;
