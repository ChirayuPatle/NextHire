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
    <div className="flex flex-col h-screen text-white font-sans">
      <h1 id='one' className="text-3xl font-bold text-white-50 tracking-wide shadow-lg p-10">NEXTHIRE</h1>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-neutral-700">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg text-sm break-words max-w-[75%] w-fit ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-neutral-900/80 text-neutral-300'}`}
            >
              <span className="font-semibold text-blue-300">{message.sender}: </span>
              <span>{message.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-neutral-900/80 shadow-lg">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 p-3 rounded-lg bg-neutral-700 text-white text-sm outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 px-6 rounded-lg bg-purple-500 text-white font-semibold text-sm hover:bg-purple-400 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;
