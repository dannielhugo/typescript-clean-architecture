import { ID } from '../../../../app/core/definitions/id';
import { Presenter, PresenterOutput } from '../../../../app/core/definitions/presenter';
import { DepositOutput } from '../../../../app/deposit/deposit.out';

export interface DepositPresenterOutput extends PresenterOutput {
  id: ID;
  balance: number;
}

export interface DepositPresenter extends Presenter<DepositOutput> {
  present(data: DepositOutput): Promise<DepositPresenterOutput>;
}
