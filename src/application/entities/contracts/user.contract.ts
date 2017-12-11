import { User } from '../data/user';

/**
 * Interface that describes user functions
 */
export interface UserContract {
  /**
   * Finds an user by its document
   */
  findByDocument(document: string): Promise<User>;

  /**
   * Finds an user by its id
   */
  findById(id: number): Promise<User>;

  /**
   * Creates a new user
   */
  create(firstName: string, lastName: string, document: string): Promise<User>;
}
