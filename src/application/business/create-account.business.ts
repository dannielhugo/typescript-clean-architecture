import { Account, ACCOUNT } from '../entities/data/account';
import { User, USER } from '../entities/data/user';
import { AccountContract } from '../entities/contracts/account.contract';
import { UserContract } from '../entities/contracts/user.contract';

export default class CreateAccountBusiness {
  constructor(
    private accountContract: AccountContract,
    private userContract: UserContract
  ) { }

  async create(userId: number, description: string, balance: number): Promise<Account> {
    const user: User = await this.userContract
      .findById(userId);

    if (!user || Object.keys(user).length === 0) {
      return Promise.reject(USER.MISSING_USER_ERROR);
    }

    const accounts: Account[] = await this.accountContract.findByUserId(user.id);

    if (accounts.length >= ACCOUNT.MAX_ACCOUNTS_LIMIT) {
      return Promise.reject(ACCOUNT.MAX_ACCOUNTS_ERROR);
    }

    return this.accountContract.create(userId, description, balance);
  }
}
