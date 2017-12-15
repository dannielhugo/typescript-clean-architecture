import { AccountRepository } from '../entities/repositories/account.repository';
import { Account } from '../entities/types/account';
import ErrorService from '../entities/services/error.service';
import { UserRepository } from '../entities/repositories/user.repository';
import { ErrorType } from '../entities/types/error-type';

/**
 * Business logic describing how to add balance to accounts
 */
export default class AddBalanceBusiness {
  constructor(
    private accountRepository: AccountRepository,
    private userRepository: UserRepository,
    private errorService: ErrorService
  ) { }

  async execute(userId: number, accountId: number, amount: number): Promise<Account> {
    const user = await this.userRepository.findById(userId);

    if (!user || Object.keys(user).length === 0) {
      await this.errorService.throw(ErrorType.USER_NOT_FOUND, { id: userId });
    }

    const account = await this.accountRepository.findByIdAndUserId(userId, accountId);

    if (!account || Object.keys(account).length === 0) {
      await this.errorService.throw(ErrorType.ACCOUNT_NOT_FOUND, { id: accountId });
    }

    const response = await this.accountRepository.addBalance(account.id, amount);

    return response;
  }
}