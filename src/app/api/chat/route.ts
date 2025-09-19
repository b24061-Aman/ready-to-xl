import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Stage } from '@/types';
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

export async function POST(request: NextRequest) {
  try {
    const { message, stage, conversationHistory } = await request.json();

    if (!message || !stage) {
      return NextResponse.json(
        { error: 'Message and stage are required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Get the appropriate system prompt for the stage
    const systemPrompt = stagePrompts[stage as Stage]?.welcome || 
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
      stream: false,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    return NextResponse.json({ response });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your OpenAI API key configuration.' },
          { status: 401 }
        );
      }
      if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
