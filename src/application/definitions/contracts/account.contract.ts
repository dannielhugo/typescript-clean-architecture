import { Account } from '../entities/account';

export interface AccountContract {
  findAll(): Promise<Account[]>;
  findById(id: number): Promise<Account>;
  create(amount: number): Promise<Account>;
  update(id: number, amount: number): Promise<Account>;
}
