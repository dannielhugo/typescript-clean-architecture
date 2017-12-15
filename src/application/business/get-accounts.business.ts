import { Account } from '../entities/types/account';
import { User } from '../entities/types/user';

import { AccountRepository } from '../entities/repositories/account.repository';

/**
 * Business logic describing how to retrieve user's accounts
 */
export default class GetAccountsBusiness {
  constructor(
    private accountRepository: AccountRepository
  ) { }

  execute(userId: number): Promise<Account[]> {
    return this.accountRepository.findByUserId(userId);
  }

}
