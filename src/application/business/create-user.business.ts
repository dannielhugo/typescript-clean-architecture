import { User, USER } from '../entities/data/user';
import { UserContract } from '../entities/contracts/user.contract';

export default class CreateUserBusiness {
  constructor(
    private userContract: UserContract
  ) { }

  async create(firstName: string, lastName: string, document: string): Promise<User> {
    const user: User = await this.userContract
      .findByDocument(document);

    // In case user already exists return a rejected promise
    if (user && Object.keys(user).length !== 0) {
      return Promise.reject(USER.DUPLICATED_USER_ERROR);
    }

    return this.userContract.create(firstName, lastName, document);
  }
}
