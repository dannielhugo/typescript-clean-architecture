import { User } from '../entities/user';

export interface UserContract {
  findByDocument(document: string): Promise<User>;
  findById(id: number): Promise<User>;
  create(firstName: string, lastName: string, document: string): Promise<User>;
}
