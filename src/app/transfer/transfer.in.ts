import { ID } from '../core/definitions/id';
import { Input } from '../core/definitions/input';

export interface TransferInput extends Input {
  from: ID;
  to: ID;
  value: number;
}
