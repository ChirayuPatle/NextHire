import { GoogleGenerativeAI } from '@google/generative-ai';
import catchErrors from '../utils/catch-errors';
import { systemPrompt } from '../configs/system-prompts';

const chatHandler = catchErrors(async (req, res) => {
  const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
  const genAI = new GoogleGenerativeAI(API_KEY);

  interface Message {
    role: 'user' | 'model';
    parts: string;
  }

  interface ConversationHistory {
    [userId: string]: Message[];
  }

  const conversationHistory: ConversationHistory = {};

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  try {
    // console.log(req.body);
    const { userId, query } = req.body;

    if (!userId || !query) {
      return res.status(400).json({ error: 'User ID and query are required' });
    }

    conversationHistory[userId] = conversationHistory[userId] || [];

    conversationHistory[userId].push({
      role: 'user',
      parts: query,
    });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        ...(conversationHistory[userId] ?? []).map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.parts }],
        })),
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 800,
      },
    });

    const result = await chat.sendMessageStream(query);

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of result.stream) {
      res.write(chunk.text());
    }

    res.end();
  } catch (error: any) {
    console.error('Error:', error);

    if (error.status === 429) {
      res.status(429).json({
        error:
          'Rate limit exceeded. Please try again later or request a quota increase.',
      });
    } else {
      res.status(500).json({ error: 'Failed to generate response' });
    }
  }
});

export { chatHandler };
