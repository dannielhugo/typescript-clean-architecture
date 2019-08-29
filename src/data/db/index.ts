import LokiConstructor from 'lokijs';

import { TransactionModel } from './transaction-model';
import { UserModel } from './user-model';

const loki = new LokiConstructor('bank.db');

const users = loki.addCollection('users');
const transactions = loki.addCollection('transactions');

export interface Database {
  users: Collection<UserModel>;
  transactions: Collection<TransactionModel>;
}

export const db: Database = {
  users,
  transactions,
};
