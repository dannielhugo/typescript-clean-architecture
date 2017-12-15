import { User } from '../entities/types/user';
import { ErrorType } from '../entities/types/error-type';

import { UserRepository } from '../entities/repositories/user.repository';

import ErrorService from '../entities/services/error.service';

/**
 * Business logic describing how to create an User
 */
export default class CreateUserBusiness {
  constructor(
    private userRepository: UserRepository,
    private errorService: ErrorService
  ) { }

  async execute(firstName: string, lastName: string, document: string): Promise<User> {
    const user: User = await this.userRepository
      .findByDocument(document);

    // In case user already exists return a rejected promise
    if (user && Object.keys(user).length !== 0) {
      await this.errorService.throw(ErrorType.USER_EXISTS);
    }

    return this.userRepository.create(firstName, lastName, document);
  }
}
