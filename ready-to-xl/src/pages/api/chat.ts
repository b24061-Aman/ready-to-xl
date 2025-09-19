import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { xatPrepPrompts } from '@/flows/xat-prep';
import { interviewPrepPrompts } from '@/flows/interview-prep';
import { waitlistPrompts } from '@/flows/waitlist';
import { finalAdmissionPrompts } from '@/flows/final-admission';
import { journeyTrackerPrompts } from '@/flows/journey-tracker';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const stagePrompts = {
  'xat-prep': xatPrepPrompts,
  'interview-prep': interviewPrepPrompts,
  'waitlist': waitlistPrompts,
  'final-admission': finalAdmissionPrompts,
  'journey-tracker': journeyTrackerPrompts,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, stage, conversationHistory } = req.body;

    if (!message || !stage) {
      return res.status(400).json({ error: 'Message and stage are required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Get the appropriate system prompt for the stage
    const systemPrompt = stagePrompts[stage as keyof typeof stagePrompts]?.welcome || 
      `You are Ready to XL, an AI assistant helping XLRI aspirants. You provide guidance and support for their MBA journey.`;

    // Build conversation context
    const messages = [
      {
        role: 'system' as const,
        content: systemPrompt,
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    return res.status(200).json({ response });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return res.status(401).json({ error: 'Invalid API key. Please check your OpenAI API key configuration.' });
      }
      if (error.message.includes('quota')) {
        return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
      }
    }

    return res.status(500).json({ error: 'An error occurred while processing your request. Please try again.' });
  }
}
