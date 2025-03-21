import { GoogleGenerativeAI } from '@google/generative-ai';
import catchErrors from '../utils/catch-errors';
import { systemPrompt } from '../configs/system-prompts';

const chatHandler = catchErrors(async (req, res) => {
  const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Define message and conversation history interfaces
  interface Message {
    role: 'user' | 'model';
    parts: string;
  }

  interface ConversationHistory {
    [userId: string]: Message[];
  }

  // Store conversation history for each user
  const conversationHistory: ConversationHistory = {};

  // Initialize the Gemini model
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash', // Use 'gemini-pro' or 'gemini-1.5-flash' based on your needs
  });

  try {
    console.log(req.body);
    const { userId, query } = req.body;

    // Validate request body
    if (!userId || !query) {
      return res.status(400).json({ error: 'User ID and query are required' });
    }

    // Initialize conversation history for new users
    conversationHistory[userId] = conversationHistory[userId] || [];

    // Add user query to conversation history
    conversationHistory[userId].push({
      role: 'user',
      parts: query,
    });

    // Generate a response using the Gemini API
    const chat = model.startChat({
      history: [
        // Add the system prompt as the first user message
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        // Add the rest of the conversation history
        ...(conversationHistory[userId] ?? []).map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.parts }],
        })),
      ],
      generationConfig: {
        temperature: 0.2, // Lower temperature for more deterministic responses
        maxOutputTokens: 800, // Limit response length
      },
    });

    // Stream the response from the Gemini API
    const result = await chat.sendMessageStream(query);

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Stream the response to the client
    for await (const chunk of result.stream) {
      res.write(chunk.text());
    }

    // End the response
    res.end();
  } catch (error: any) {
    console.error('Error:', error);

    // Handle rate-limiting errors
    if (error.status === 429) {
      res.status(429).json({
        error:
          'Rate limit exceeded. Please try again later or request a quota increase.',
      });
    } else {
      // Handle other errors
      res.status(500).json({ error: 'Failed to generate response' });
    }
  }
});

export { chatHandler };
