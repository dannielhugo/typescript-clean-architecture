import { Validator } from '../core/definitions/validator';
import { ValidatorResult } from '../core/definitions/validator-result';

import { TransferInput } from './transfer.in';

export interface TransferValidator extends Validator<TransferInput> {
  validate(request: TransferInput): ValidatorResult;
}
