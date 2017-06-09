import { AccountService } from '../services/account.service';
import { Account } from '../core/account';

export class AccountBusiness {
  constructor(
    private accountService: AccountService
  ) {}

  getAll(): Account[] {
    return this.accountService.getAll();
  }
}
