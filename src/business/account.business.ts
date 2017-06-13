import AccountService from '../services/account.service';
import { Account } from '../definitions/entities/account';

export default class AccountBusiness {
  constructor(
    private accountService: AccountService
  ) {}

  getAll(): Promise<Account[]> {
    return this.accountService.getAll();
  }

  create(account: Account): Promise<{}> {
    return this.accountService.create(account);
  }
}
