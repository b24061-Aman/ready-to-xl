export class ChatError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ChatError';
  }
}

export const errorMessages = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  API_KEY_MISSING: 'API key not configured. Please contact support.',
  API_QUOTA_EXCEEDED: 'API quota exceeded. Please try again later.',
  INVALID_REQUEST: 'Invalid request. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

export function handleApiError(error: any): string {
  if (error instanceof ChatError) {
    return error.message;
  }

  if (error?.message?.includes('API key')) {
    return errorMessages.API_KEY_MISSING;
  }

  if (error?.message?.includes('quota')) {
    return errorMessages.API_QUOTA_EXCEEDED;
  }

  if (error?.message?.includes('network') || error?.code === 'NETWORK_ERROR') {
    return errorMessages.NETWORK_ERROR;
  }

  if (error?.message?.includes('timeout')) {
    return errorMessages.TIMEOUT;
  }

  if (error?.status === 400) {
    return errorMessages.INVALID_REQUEST;
  }

  if (error?.status >= 500) {
    return errorMessages.SERVER_ERROR;
  }

  return errorMessages.UNKNOWN_ERROR;
}

export function isRetryableError(error: any): boolean {
  if (error instanceof ChatError) {
    return error.statusCode >= 500 || error.code === 'NETWORK_ERROR';
  }

  return error?.status >= 500 || error?.code === 'NETWORK_ERROR';
}
