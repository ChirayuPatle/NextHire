import { useState } from "react";
import { Send } from "lucide-react";

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "ai" }>>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("https://api.example.com/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const aiMessage = { text: data.reply, sender: "ai" };
      setMessages((prev: Array<{ text: string; sender: "user" | "ai" }>) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col space-y-4 overflow-auto h-96">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user" ? "bg-blue-500 self-end" : "bg-gray-700 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="w-full max-w-lg flex items-center space-x-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-md"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AiChat;
