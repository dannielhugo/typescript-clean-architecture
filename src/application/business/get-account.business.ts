import { Account, ACCOUNT } from '../entities/data/account';
import { User, USER } from '../entities/data/user';
import { AccountContract } from '../entities/contracts/account.contract';
import { UserContract } from '../entities/contracts/user.contract';

export default class GetAccountBusiness {
  constructor(
    private accountContract: AccountContract,
    private userContract: UserContract
  ) { }

  findByUserId(userId: number): Promise<Account[]> {
    return this.accountContract.findByUserId(userId);
  }

}
