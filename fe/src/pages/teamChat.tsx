import React, { useState } from 'react';

// Define the type for a message
type Message = {
  id: number;
  text: string;
  sender: string;
};

const TeamChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: 'You', // Replace with dynamic sender if needed
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white font-sans">
      {/* Chat Header */}
      <div className="p-6 bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold text-blue-400">NEXTHIRE</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg text-sm break-words max-w-[75%] w-fit ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              <span className="font-semibold text-blue-300">{message.sender}: </span>
              <span>{message.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-gray-900 shadow-lg">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 px-6 rounded-lg bg-blue-500 text-gray-900 font-semibold text-sm hover:bg-blue-400 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;