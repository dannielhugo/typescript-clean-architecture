import { User, USER } from '../entities/data/user';
import { UserContract } from '../entities/contracts/user.contract';

export default class CreateUserBusiness {
  constructor(
    private userContract: UserContract
  ) { }

  create(firstName: string, lastName: string, document: string): Promise<User> {
    return this.userContract
      .findByDocument(document)
      .then((user) => {
        // In case user already exists return a rejected promise
        if (user) {
          return Promise.reject(USER.DUPLICATED_USER_ERROR);
        }

        return this.userContract.create(firstName, lastName, document);
      });
  }
}
