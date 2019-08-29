import { ID } from '../../../../app/core/definitions/id';
import { Presenter, PresenterOutput } from '../../../../app/core/definitions/presenter';
import { TransferOutput } from '../../../../app/transfer/transfer.out';

export interface TransferPresenterOutput extends PresenterOutput {
  id: ID;
}

export interface TransferPresenter extends Presenter<TransferOutput> {
  present(data: TransferOutput): Promise<TransferPresenterOutput>;
}
