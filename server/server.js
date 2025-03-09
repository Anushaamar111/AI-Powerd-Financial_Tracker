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
connectDB()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Middleware
app.use(express.json({ limit: "10mb" })); // Prevent large payloads
app.use(cookieParser());

// CORS Middleware
const allowedOrigins = ["https://ai-powerd-financial-tracker-frontend.onrender.com"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests (OPTIONS)
app.options("*", cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/ai", aiRoute);
app.use("/api/chatbot", chatbotRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 AI-Powered Financial Tracker Backend is Running!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start server on an available port
portfinder.getPort((err, port) => {
  if (err) {
    console.error("❌ Failed to find available port:", err);
    process.exit(1);
  }
  app.listen(port, () => console.log(`✅ Server running on port ${port}`));
});
