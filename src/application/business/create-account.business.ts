import { Account, ACCOUNT } from '../entities/types/account';
import { User } from '../entities/types/user';
import { ErrorType } from '../entities/types/error-type';

import { AccountRepository } from '../entities/repositories/account.repository';
import { UserRepository } from '../entities/repositories/user.repository';

import ErrorService from '../entities/services/error.service';

/**
 * Business logic describing how to create an Account
 */
export default class CreateAccountBusiness {
  constructor(
    private accountRepository: AccountRepository,
    private userRepository: UserRepository,
    private errorService: ErrorService
  ) { }

  async execute(userId: number, description: string, balance: number): Promise<Account> {
    const user: User = await this.userRepository
      .findById(userId);

    if (!user || Object.keys(user).length === 0) {
      await this.errorService.throw(ErrorType.USER_NOT_FOUND, { id: userId });
    }

    const accounts: Account[] = await this.accountRepository.findByUserId(user.id);

    if (accounts.length >= ACCOUNT.MAX_ACCOUNTS_LIMIT) {
      await this.errorService.throw(ErrorType.MAX_ACCOUNTS_REACHED);
    }

    return this.accountRepository.create(userId, description, balance);
  }
}
