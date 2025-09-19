import { ReminderPreferences } from '@/types';

const STORAGE_KEYS = {
  REMINDER_PREFERENCES: 'ready-to-xl-reminder-preferences',
  USER_PROFILE: 'ready-to-xl-user-profile',
  CHAT_HISTORY: 'ready-to-xl-chat-history',
} as const;

export const localStorage = {
  // Reminder preferences
  getReminderPreferences: (): ReminderPreferences | null => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.REMINDER_PREFERENCES);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading reminder preferences:', error);
      return null;
    }
  },

  setReminderPreferences: (preferences: ReminderPreferences): void => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.REMINDER_PREFERENCES,
        JSON.stringify(preferences)
      );
    } catch (error) {
      console.error('Error saving reminder preferences:', error);
    }
  },

  // User profile
  getUserProfile: () => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  },

  setUserProfile: (profile: any): void => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.USER_PROFILE,
        JSON.stringify(profile)
      );
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  },

  // Chat history (for backup)
  getChatHistory: () => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  },

  setChatHistory: (history: any[]): void => {
    try {
      // Keep only last 50 messages to avoid storage issues
      const limitedHistory = history.slice(-50);
      window.localStorage.setItem(
        STORAGE_KEYS.CHAT_HISTORY,
        JSON.stringify(limitedHistory)
      );
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  },

  // Clear all data
  clearAll: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        window.localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  // Check if localStorage is available
  isAvailable: (): boolean => {
    try {
      const test = '__localStorage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  },
};
