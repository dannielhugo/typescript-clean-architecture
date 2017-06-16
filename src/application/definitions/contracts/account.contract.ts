import { Account } from '../entities/account';

export interface AccountContract {
  findByUserId(id: number): Promise<Account[]>;
  findById(id: number): Promise<Account>;
  create(userId: number, description: string, balance: number): Promise<Account>;
}
