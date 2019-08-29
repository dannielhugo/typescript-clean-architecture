import { ID } from '../core/definitions/id';
import { Output } from '../core/definitions/output';

export interface DepositOutput extends Output {
  transactionId: ID;
  balance: number;
}
