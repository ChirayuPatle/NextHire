import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

interface Message {
  text: string;
  sender: "user" | "ai";
}

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streamedResponse, setStreamedResponse] = useState<string>("");
  const userId = useRef<string>(`user-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatHistory-${userId.current}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          text: "Hello! I'm here to help with any questions about the interview process. What would you like to know?",
          sender: "ai",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`chatHistory-${userId.current}`, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedResponse]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (): Promise<void> => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamedResponse("");

    try {
      console.log(userId.current, "----", userMessage.text);

      const response = await axios.post("http://localhost:8000/api/ai/chat", {
        userId: userId.current,
        query: userMessage.text,
      });

      console.log(response);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const aiResponse: string = response.data as string;

      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
      setStreamedResponse("");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again or contact our support team.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-6">
        <button onClick={() => navigate(-1)} className="text-white mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        NEXT Assistant
        </h1>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="w-full max-w-2xl mx-auto">
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
                {streamedResponse ? (
                  <span>{streamedResponse}</span>
                ) : (
                  <span className="animate-pulse">Typing...</span>
                )}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input Container */}
      <div className="p-4">
        <div className="w-full max-w-2xl mx-auto flex items-center space-x-2">
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
    </div>
  );
};

export default AiChat;
