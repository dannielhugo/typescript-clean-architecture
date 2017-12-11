
/**
 * Represents an Account
 */
export interface Account {
  id: number;
  description: string;
  userId: number;
  balance: number;
}

export const ACCOUNT = {
  MAX_ACCOUNTS_LIMIT: 5
};
