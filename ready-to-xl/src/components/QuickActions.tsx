'use client';

import React from 'react';
import { useChatStore } from '@/lib/store';
import { BookOpen, Users, Clock, CheckCircle, BarChart3, Lightbulb, Target, HelpCircle } from 'lucide-react';

const quickActions = [
  {
    id: 'xat-prep',
    title: 'XAT Preparation',
    description: 'Get help with XAT prep',
    icon: BookOpen,
    color: 'bg-blue-500',
    prompt: 'Help me with XAT preparation. What should I focus on?',
  },
  {
    id: 'interview-prep',
    title: 'Interview Prep',
    description: 'Ace your interviews',
    icon: Users,
    color: 'bg-green-500',
    prompt: 'I need help with interview preparation. Where should I start?',
  },
  {
    id: 'waitlist',
    title: 'Waitlist Support',
    description: 'Navigate waitlist process',
    icon: Clock,
    color: 'bg-yellow-500',
    prompt: 'I\'m on the waitlist. What should I do?',
  },
  {
    id: 'final-admission',
    title: 'Final Admission',
    description: 'Prepare for XLRI',
    icon: CheckCircle,
    color: 'bg-purple-500',
    prompt: 'I got admitted to XLRI! What should I do next?',
  },
  {
    id: 'journey-tracker',
    title: 'Track Progress',
    description: 'Monitor your journey',
    icon: BarChart3,
    color: 'bg-indigo-500',
    prompt: 'Help me track my XLRI journey progress.',
  },
];

const generalActions = [
  {
    title: 'Study Tips',
    description: 'Get personalized study advice',
    icon: Lightbulb,
    prompt: 'Give me some study tips for MBA preparation.',
  },
  {
    title: 'Goal Setting',
    description: 'Set and track your goals',
    icon: Target,
    prompt: 'Help me set goals for my MBA journey.',
  },
  {
    title: 'General Help',
    description: 'Ask any question',
    icon: HelpCircle,
    prompt: 'I have a general question about my MBA journey.',
  },
];

export default function QuickActions() {
  const { addMessage, setCurrentStage } = useChatStore();

  const handleActionClick = (prompt: string, stageId?: string) => {
    if (stageId) {
      setCurrentStage(stageId as any);
    }
    addMessage({ content: prompt, role: 'user' });
  };

  return (
    <div className="space-y-8">
      {/* Stage-specific actions */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-6 text-center">Choose Your Stage</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleActionClick(action.prompt, action.id)}
                className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200/50 hover:border-xlri-blue/50 hover:shadow-xl transition-all duration-300 text-left group hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${action.color} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 group-hover:text-xlri-blue transition-colors text-lg">
                      {action.title}
                    </h5>
                    <p className="text-sm text-gray-600 mt-2 font-medium">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* General actions */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-6 text-center">Quick Help</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {generalActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleActionClick(action.prompt)}
                className="p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-xlri-blue/50 hover:bg-white/80 transition-all duration-300 text-left group hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-xlri-blue transition-colors" />
                  <span className="font-bold text-gray-900 group-hover:text-xlri-blue transition-colors">
                    {action.title}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 font-medium">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
