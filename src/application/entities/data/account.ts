export interface Account {
  id: number;
  description: string;
  userId: number;
  balance: number;
}

export const ACCOUNT = {
  MAX_ACCOUNTS_ERROR: 'account_limit_reached',
  MAX_ACCOUNTS_LIMIT: 5
};
