'use client';

import React from 'react';
import { Stage } from '@/types';
import { useChatStore } from '@/lib/store';
import { BookOpen, Users, Clock, CheckCircle, BarChart3 } from 'lucide-react';

const stages: Array<{
  id: Stage;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}> = [
  {
    id: 'xat-prep',
    name: 'XAT Preparation',
    description: 'Master the Xavier Aptitude Test',
    icon: BookOpen,
    color: 'bg-blue-500',
  },
  {
    id: 'interview-prep',
    name: 'Interview Prep',
    description: 'Ace your PI, GD, and WAT',
    icon: Users,
    color: 'bg-green-500',
  },
  {
    id: 'waitlist',
    name: 'Waitlist Support',
    description: 'Navigate the waitlist process',
    icon: Clock,
    color: 'bg-yellow-500',
  },
  {
    id: 'final-admission',
    name: 'Final Admission',
    description: 'Onboard to XLRI successfully',
    icon: CheckCircle,
    color: 'bg-purple-500',
  },
  {
    id: 'journey-tracker',
    name: 'Journey Tracker',
    description: 'Track your progress and goals',
    icon: BarChart3,
    color: 'bg-indigo-500',
  },
];

interface StageSelectorProps {
  onClose: () => void;
}

export default function StageSelector({ onClose }: StageSelectorProps) {
  const { currentStage, switchStage } = useChatStore();

  const handleStageSelect = (stage: Stage) => {
    switchStage(stage);
    onClose();
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Choose Your Stage</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;
          
          return (
            <button
              key={stage.id}
              onClick={() => handleStageSelect(stage.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:scale-105 ${
                isActive
                  ? 'border-xlri-blue bg-gradient-to-r from-xlri-blue/10 to-purple-600/10 shadow-xl'
                  : 'border-gray-200/50 hover:border-xlri-blue/50 hover:bg-white/80 hover:shadow-lg'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${stage.color} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg group-hover:text-xlri-blue transition-colors">{stage.name}</h4>
                  <p className="text-sm text-gray-600 mt-2 font-medium">{stage.description}</p>
                </div>
                {isActive && (
                  <div className="w-3 h-3 bg-gradient-to-r from-xlri-blue to-purple-600 rounded-full mt-2 animate-pulse"></div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
