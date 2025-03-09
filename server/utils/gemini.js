// filepath: c:\Users\anush\Desktop\mini_expense_tracker\server\utils\gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import { getUserSpending } from "../controller/expenseController.js"; // Import the new utility function
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const getExpenseSuggestions = async (income, budget, userId) => {
  try {
    const totalSpending = await getUserSpending(userId); // Fetch total spending from the database

    const prompt = `
    Here is the financial information for a user:
    - Monthly Income: ₹${income}
    - Monthly Budget: ₹${budget}
    - Total Spending so far: ₹${totalSpending}
    
    Based on this data, please provide detailed and actionable suggestions for better managing their finances.
    - Use simple language and avoid markdown or special formatting like **bold** or *italics*.
    - Present the suggestions as a numbered or bulleted list in plain text.
    - Keep the recommendations practical and easy to implement.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get AI suggestions from Gemini API");
  }
};