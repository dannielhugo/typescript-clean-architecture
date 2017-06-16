import { User } from '../definitions/entities/user';
import { UserContract } from '../definitions/contracts/user.contract';

export default class UserBusiness {
  constructor(
    private userContract: UserContract
  ) { }

  create(firstName: string, lastName: string, document: string): Promise<User> {
    return this.userContract
      .findByDocument(document)
      .then((user) => {
        // In case user already exists
        if (user) return user;

        return this.userContract.create(firstName, lastName, document);
      });
  }
}
