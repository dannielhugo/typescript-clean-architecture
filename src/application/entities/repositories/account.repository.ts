import { Account } from '../types/account';

/**
 * Interface that describes account functions
 */
export interface AccountRepository {
  /**
   * Finds an account by its user's id
   */
  findByUserId(id: number): Promise<Account[]>;
  /**
   * Finds an account by its id
   */
  findById(id: number): Promise<Account>;

  /**
   * Creates a new account for user specified by userId
   */
  create(userId: number, description: string, balance: number): Promise<Account>;
}
