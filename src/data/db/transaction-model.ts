import { ID } from '../../app/core/definitions/id';
import { Model } from '../../app/core/definitions/model';
import { Transaction, TRANSACTION_TYPES } from '../../app/core/entities/transaction';

import { UserModel } from './user-model';

export class TransactionModel implements Model {
  constructor(
    public from: UserModel,
    public to: UserModel,
    public value: number,
    public type: TRANSACTION_TYPES,
    public $loki?: ID,
  ) {}

  toEntity(): Transaction {
    return new Transaction(this.from.toEntity(), this.to.toEntity(), this.value, this.type, this.$loki as ID);
  }
}
