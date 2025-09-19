'use client';

import React from 'react';
import { Message } from '@/types';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
          isUser 
            ? 'bg-gradient-to-r from-xlri-blue to-purple-600 text-white' 
            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
        }`}>
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`px-6 py-4 rounded-3xl shadow-lg ${
              isUser
                ? 'bg-gradient-to-r from-xlri-blue to-purple-600 text-white rounded-br-lg'
                : 'bg-white text-gray-900 border border-gray-200/50 rounded-bl-lg backdrop-blur-sm'
            }`}
          >
            <div className="whitespace-pre-wrap text-base leading-relaxed font-medium">
              {message.content}
            </div>
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
            <span className="font-medium">{timestamp}</span>
            {message.stage && (
              <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                {message.stage.replace('-', ' ').toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
