import { ID } from '../core/definitions/id';
import { Output } from '../core/definitions/output';

export interface TransferOutput extends Output {
  transactionId: ID;
}
