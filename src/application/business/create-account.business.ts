import { Account, ACCOUNT } from '../entities/types/account';
import { User } from '../entities/types/user';
import { ErrorType } from '../entities/types/error-type';

import { AccountContract } from '../entities/contracts/account.contract';
import { UserContract } from '../entities/contracts/user.contract';

import ErrorService from '../entities/services/error.service';

/**
 * Business logic describing how to create an Account
 */
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
      await this.errorService.throw(ErrorType.USER_NOT_FOUND, { id: userId });
    }

    const accounts: Account[] = await this.accountContract.findByUserId(user.id);

    if (accounts.length >= ACCOUNT.MAX_ACCOUNTS_LIMIT) {
      await this.errorService.throw(ErrorType.MAX_ACCOUNTS_REACHED);
    }

    return this.accountContract.create(userId, description, balance);
  }
}
