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

dotenv.config(); // Ensure this line is present
const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'https://ai-powerd-financial-tracker-frontend.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));


app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/ai", aiRoute);
app.use("/api/chatbot", chatbotRoutes);

portfinder.getPort((err, port) => {
  if (err) throw err;
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
