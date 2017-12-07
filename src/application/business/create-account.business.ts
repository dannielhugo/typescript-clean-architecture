import { Account, ACCOUNT } from '../entities/data/account';
import { User } from '../entities/data/user';
import { AccountContract } from '../entities/contracts/account.contract';
import { UserContract } from '../entities/contracts/user.contract';
import ErrorService from '../entities/services/error.service';

export default class CreateAccountBusiness {
  constructor(
    private accountContract: AccountContract,
    private userContract: UserContract,
    private errorService: ErrorService
  ) { }

  async create(userId: number, description: string, balance: number): Promise<Account> {
    const user: User = await this.userContract
      .findById(userId);

    if (!user || Object.keys(user).length === 0) {
      await this.errorService.throw('user_not_found', { id: userId });
    }

    const accounts: Account[] = await this.accountContract.findByUserId(user.id);

    if (accounts.length >= ACCOUNT.MAX_ACCOUNTS_LIMIT) {
      await this.errorService.throw('max_accounts_reached');
    }

    return this.accountContract.create(userId, description, balance);
  }
}
