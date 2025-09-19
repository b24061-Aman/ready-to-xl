import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Message, Stage, UserProfile } from '@/types';
import { localStorage } from './localStorage';

interface ChatStore extends ChatState {
  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setCurrentStage: (stage: Stage) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateProgress: (stage: Stage, progress: Partial<ChatState['userProfile']['progress'][Stage]>) => void;
  switchStage: (stage: Stage) => void;
}

const initialUserProfile: UserProfile = {
  currentStage: 'xat-prep',
  preferences: {
    reminders: true,
    notifications: true,
    studyReminders: true,
    interviewReminders: true,
  },
  progress: {
    'xat-prep': {
      started: false,
      completed: false,
      progressPercentage: 0,
      lastActive: new Date(),
    },
    'interview-prep': {
      started: false,
      completed: false,
      progressPercentage: 0,
      lastActive: new Date(),
    },
    'waitlist': {
      started: false,
      completed: false,
      progressPercentage: 0,
      lastActive: new Date(),
    },
    'final-admission': {
      started: false,
      completed: false,
      progressPercentage: 0,
      lastActive: new Date(),
    },
    'journey-tracker': {
      started: false,
      completed: false,
      progressPercentage: 0,
      lastActive: new Date(),
    },
  },
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      currentStage: 'xat-prep',
      isLoading: false,
      userProfile: initialUserProfile,
      error: null,

      addMessage: (message) => {
        const newMessage: Message = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      setCurrentStage: (stage) => {
        set({ currentStage: stage });
        // Update progress when switching stages
        const currentProgress = get().userProfile.progress[stage];
        if (currentProgress) {
          set((state) => ({
            userProfile: {
              ...state.userProfile,
              progress: {
                ...state.userProfile.progress,
                [stage]: {
                  ...currentProgress,
                  started: true,
                  lastActive: new Date(),
                },
              },
            },
          }));
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearMessages: () => set({ messages: [] }),

      updateUserProfile: (profile) => {
        set((state) => ({
          userProfile: { ...state.userProfile, ...profile },
        }));
      },

      updateProgress: (stage, progress) => {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            progress: {
              ...state.userProfile.progress,
              [stage]: {
                ...state.userProfile.progress[stage],
                ...progress,
              },
            },
          },
        }));
      },

      switchStage: (stage) => {
        set({ currentStage: stage });
        // Add a system message about stage switch
        get().addMessage({
          content: `Switched to ${stage.replace('-', ' ').toUpperCase()} stage. How can I help you with your ${stage.replace('-', ' ')} journey?`,
          role: 'assistant',
          stage,
        });
        // Save to localStorage
        if (localStorage.isAvailable()) {
          localStorage.setUserProfile(get().userProfile);
        }
      },
    }),
    {
      name: 'ready-to-xl-store',
      partialize: (state) => ({
        userProfile: state.userProfile,
        currentStage: state.currentStage,
      }),
    }
  )
);
