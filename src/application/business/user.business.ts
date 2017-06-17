import { User, USER } from '../definitions/entities/user';
import { UserContract } from '../definitions/contracts/user.contract';

export default class UserBusiness {
  constructor(
    private userContract: UserContract
  ) {}

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
