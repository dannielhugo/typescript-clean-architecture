import { TransferOutput } from '../../../../app/transfer/transfer.out';

import { TransferPresenter, TransferPresenterOutput } from './transfer.presenter';

export class TransferPresenterImpl implements TransferPresenter {
  present(data: TransferOutput): Promise<TransferPresenterOutput> {
    return Promise.resolve({ id: data.transactionId });
  }
}
