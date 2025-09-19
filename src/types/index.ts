export type Stage = 'xat-prep' | 'interview-prep' | 'waitlist' | 'final-admission' | 'journey-tracker';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  stage?: Stage;
}

export interface UserProfile {
  name?: string;
  email?: string;
  currentStage: Stage;
  preferences: {
    reminders: boolean;
    notifications: boolean;
    studyReminders: boolean;
    interviewReminders: boolean;
  };
  progress: {
    [key in Stage]?: {
      started: boolean;
      completed: boolean;
      progressPercentage: number;
      lastActive: Date;
    };
  };
}

export interface ChatState {
  messages: Message[];
  currentStage: Stage;
  isLoading: boolean;
  userProfile: UserProfile;
  error: string | null;
}

export interface ReminderPreferences {
  studyReminders: boolean;
  interviewReminders: boolean;
  generalReminders: boolean;
  reminderTime: string;
  reminderDays: string[];
}
