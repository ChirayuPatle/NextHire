import { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  text: string;
  sender: "user" | "ai";
}

interface ApiResponse {
  reply?: string;
}

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Mock API call
      const mockResponse: ApiResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ reply: "This is a mock response from the AI." });
        }, 1000);
      });

      // Uncomment the following code to use the actual API
      /*
      const response = await fetch("https://api.example.com/gemini-chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY" // Add API key if required
        },
        body: JSON.stringify({ message: input }),
      });

      const data: ApiResponse = await response.json();
      */

      const data: ApiResponse = mockResponse; // Use mock response for now

      if (data?.reply) {
        const aiMessage: Message = { text: data.reply, sender: "ai" };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        console.error("Invalid API response:", data);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        AI Chat
      </h1>
      <div className="w-full max-w-2xl bg-neutral-800 rounded-xl shadow-2xl p-4 flex flex-col space-y-4 overflow-auto h-[500px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                🤖
              </div>
            )}
            <div
              className={`p-3 rounded-lg max-w-md ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-neutral-700 text-white"
              } ${
                msg.sender === "user" ? "rounded-br-none" : "rounded-bl-none"
              } shadow-md`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                👤
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              🤖
            </div>
            <div className="p-3 rounded-lg bg-neutral-700 text-white rounded-bl-none shadow-md">
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="w-full max-w-2xl flex items-center space-x-2 mt-6">
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          className="w-full bg-neutral-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          disabled={isLoading}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          disabled={isLoading}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AiChat;