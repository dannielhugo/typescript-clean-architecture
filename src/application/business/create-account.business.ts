import { Account, ACCOUNT } from '../entities/data/account';
import { User, USER } from '../entities/data/user';
import { AccountContract } from '../entities/contracts/account.contract';
import { UserContract } from '../entities/contracts/user.contract';

export default class CreateAccountBusiness {
  constructor(
    private accountContract: AccountContract,
    private userContract: UserContract
  ) { }

  create(userId: number, description: string, balance: number): Promise<Account> {
    return this.userContract
      .findById(userId)
      .then((user) => {
        if (!user) {
          return Promise.reject(USER.MISSING_USER_ERROR);
        }

        return this.accountContract.findByUserId(user.id);
      })
      .then((accounts: Account[]) => {
        if (accounts.length > ACCOUNT.MAX_ACCOUNTS_LIMIT) {
          return Promise.reject(ACCOUNT.MAX_ACCOUNTS_ERROR);
        }

        return this.accountContract.create(userId, description, balance);
      });
  }
}
