import { User } from '../entities/types/user';
import { ErrorType } from '../entities/types/error-type';

import { UserContract } from '../entities/contracts/user.contract';

import ErrorService from '../entities/services/error.service';

/**
 * Business logic describing how to create an User
 */
export default class CreateUserBusiness {
  constructor(
    private userContract: UserContract,
    private errorService: ErrorService
  ) { }

  async create(firstName: string, lastName: string, document: string): Promise<User> {
    const user: User = await this.userContract
      .findByDocument(document);

    // In case user already exists return a rejected promise
    if (user && Object.keys(user).length !== 0) {
      await this.errorService.throw(ErrorType.USER_EXISTS);
    }

    return this.userContract.create(firstName, lastName, document);
  }
}
