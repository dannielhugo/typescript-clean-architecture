import { ID } from '../core/definitions/id';
import { Transaction } from '../core/entities/transaction';
import { User } from '../core/entities/user';

export interface DepositRepository {
  findUserById(id: ID): Promise<User | null>;
  saveUser(user: User): Promise<boolean>;
  createTransaction(transaction: Transaction): Promise<ID>;
}
