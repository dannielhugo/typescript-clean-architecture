import { Account, ACCOUNT } from '../definitions/entities/account';
import { User, USER } from '../definitions/entities/user';
import { AccountContract } from '../definitions/contracts/account.contract';
import { UserContract } from '../definitions/contracts/user.contract';

export default class GetAccountBusiness {
  constructor(
    private accountContract: AccountContract,
    private userContract: UserContract
  ) {}

  findByUserId(userId: number): Promise<Account[]> {
    return this.accountContract.findByUserId(userId);
  }

}
