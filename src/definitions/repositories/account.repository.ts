import { Account } from '../entities/account';

export interface AccountRepository {
  findAll(): Promise<Account[]>;
  findById(id: number): Promise<Account>;
  create(data: Account): Promise<Account>;
  update(id: number, account: Account): Promise<Account>;
}
