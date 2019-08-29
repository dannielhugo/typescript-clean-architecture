import { ID } from '../../app/core/definitions/id';
import { Transaction } from '../../app/core/entities/transaction';
import { User } from '../../app/core/entities/user';
import { DepositRepository } from '../../app/deposit/deposit.repository';
import { Database } from '../db';
import { TransactionModel } from '../db/transaction-model';
import { UserModel } from '../db/user-model';

export class DepositRepositoryImpl implements DepositRepository {
  constructor(private db: Database) {}

  findUserById(id: ID): Promise<User | null> {
    const user = this.db.users.get(Number(id));

    if (user) {
      return Promise.resolve((user as UserModel).toEntity());
    }

    return Promise.resolve(null);
  }

  saveUser(user: User): Promise<boolean> {
    let dbUser = this.db.users.get(Number(user.id));

    if (!dbUser) {
      return Promise.reject();
    }

    dbUser = Object.assign(dbUser, user);
    this.db.users.update(dbUser);

    return Promise.resolve(true);
  }

  createTransaction(transaction: Transaction): Promise<ID> {
    const from = transaction.from;
    const to = transaction.to;

    const fromModel = this.db.users.get(Number(from.id));
    const toModel = this.db.users.get(Number(to.id));

    const transactionModel = new TransactionModel(fromModel, toModel, transaction.value, transaction.type);

    const inserted = this.db.transactions.insert(transactionModel);

    if (inserted) {
      return Promise.resolve(inserted.$loki as ID);
    }

    return Promise.reject();
  }
}
