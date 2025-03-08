import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoute.js";
import expenseRoutes from "./routes/expenseRoute.js";
import aiRoute from "./routes/aiRoute.js";
import chatbotRoutes from "./routes/chatbotRoute.js";
import portfinder from "portfinder";

dotenv.config(); // Load environment variables

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Middleware
app.use(
  cors({
    origin: "https://ai-powerd-financial-tracker-frontend.onrender.com", // Allow frontend access
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Handle preflight requests (OPTIONS)
app.options("*", cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/ai", aiRoute);
app.use("/api/chatbot", chatbotRoutes);

// Start server on an available port
portfinder.getPort((err, port) => {
  if (err) throw err;
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
