import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are a friendly and knowledgeable chatbot that provides clear, concise, and easy-to-understand answers about personal finance.  
    
    Response Format Guidelines:  
    - Use simple language and avoid overly technical terms.  
    - Structure responses into short paragraphs and numbered or labeled points where necessary.  
    - If relevant, provide brief examples to make concepts clearer.  
    - If a question has no single right answer, explain the factors that influence the decision.  
    - Always end with a helpful takeaway or next step.  
    
    If you don’t know the answer, just say so in a polite and honest way.`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Understood! I will provide well-structured and easy-to-read finance advice.",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    res.json({ reply: response.text() });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
