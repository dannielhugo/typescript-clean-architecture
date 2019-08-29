import { ID } from '../core/definitions/id';
import { Input } from '../core/definitions/input';

export interface DepositInput extends Input {
  userId: ID;
  value: number;
}
