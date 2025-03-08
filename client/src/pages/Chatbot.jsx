import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  // Use useEffect to set the chatbot to full screen on mount
  useEffect(() => {
    document.documentElement.classList.add('h-full');
    document.body.classList.add('h-full');
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chatbot`,
        { message: input }
      );
      const botReply = {
        text: response.data.reply,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      const botReply = {
        text: "Sorry, I'm having trouble connecting to the server.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-gray-100 dark:bg-gray-800 p-4">
        <Link
          to="/dashboard" // Replace with your dashboard route
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Back to Dashboard
        </Link>
      </nav>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 border-b border-gray-200 dark:border-gray-700">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md w-fit max-w-xs my-2 ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field & Send Button */}
      <div className="p-4 flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleSendMessage}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;