'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/lib/store';
import { Stage } from '@/types';
import { Send, Loader2, Bot, User, Settings, BookOpen, Users, Clock, CheckCircle, BarChart3 } from 'lucide-react';
import StageSelector from './StageSelector';
import MessageBubble from './MessageBubble';
import QuickActions from './QuickActions';

const stageIcons = {
  'xat-prep': BookOpen,
  'interview-prep': Users,
  'waitlist': Clock,
  'final-admission': CheckCircle,
  'journey-tracker': BarChart3,
};

const stageColors = {
  'xat-prep': 'bg-blue-500',
  'interview-prep': 'bg-green-500',
  'waitlist': 'bg-yellow-500',
  'final-admission': 'bg-purple-500',
  'journey-tracker': 'bg-indigo-500',
};

export default function ChatInterface() {
  const [inputMessage, setInputMessage] = useState('');
  const [showStageSelector, setShowStageSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    currentStage,
    isLoading,
    error,
    addMessage,
    setLoading,
    setError,
  } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    addMessage({ content: userMessage, role: 'user', stage: currentStage });
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          stage: currentStage,
          conversationHistory: messages.slice(-10), // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      addMessage({ content: data.response, role: 'assistant', stage: currentStage });
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const CurrentStageIcon = stageIcons[currentStage];
  const stageColor = stageColors[currentStage];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stageColor} text-white shadow-lg animate-pulse-slow`}>
              <CurrentStageIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-xlri-blue to-purple-600 bg-clip-text text-transparent">
                Ready to XL
              </h1>
              <p className="text-sm text-gray-600 capitalize font-medium">
                {currentStage.replace('-', ' ')} Assistant
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowStageSelector(!showStageSelector)}
            className="p-3 text-gray-600 hover:text-xlri-blue hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stage Selector */}
      {showStageSelector && (
        <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 p-6 animate-slide-in-up">
          <StageSelector onClose={() => setShowStageSelector(false)} />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-xlri-blue to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce-slow">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Welcome to Ready to XL! 🚀
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              Your AI-powered companion for the XLRI journey. Choose a stage or ask me anything!
            </p>
            <QuickActions />
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={message.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <MessageBubble message={message} />
              </div>
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center space-x-3 text-gray-500 bg-white/50 backdrop-blur-sm rounded-xl p-4 mx-4">
            <Loader2 className="w-5 h-5 animate-spin text-xlri-blue" />
            <span className="font-medium">AI is thinking...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 mx-4 text-red-700 shadow-lg">
            <p className="font-semibold text-red-800">Oops! Something went wrong</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 p-6">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your XLRI journey..."
            className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-xlri-blue focus:border-transparent outline-none transition-all duration-200 text-lg shadow-sm hover:shadow-md"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-4 bg-gradient-to-r from-xlri-blue to-purple-600 text-white rounded-2xl hover:from-xlri-blue-dark hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
