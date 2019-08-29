import { ID } from '../core/definitions/id';
import { User } from '../core/entities/user';

export interface TransferRepository {
  findUserById(id: ID): Promise<User | null>;
  transfer(from: User, to: User, value: number): Promise<ID>;
}
