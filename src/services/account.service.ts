import { Account } from '../definitions/entities/account';
import { AccountRepository } from '../definitions/repositories/account.repository';

export default class AccountService {

  constructor(
    private accountRepository: AccountRepository
  ) { }

  getAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  create(account: Account): Promise<{}> {
    return this.accountRepository.create(account);
  }
}
