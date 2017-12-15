import { User } from '../types/user';

/**
 * Interface that describes user functions
 */
export interface UserRepository {
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
