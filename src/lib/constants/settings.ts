// Application settings constants
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export const TRANSFER_LIMITS = {
  MIN_AMOUNT: 10,
  MAX_AMOUNT: 10000,
  DEFAULT_DAILY_LIMIT: 5000,
};

export const SECURITY_SETTINGS = {
  DEFAULT_2FA_METHOD: 'authenticator',
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_LOGIN_ATTEMPTS: 3,
};