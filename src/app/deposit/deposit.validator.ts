import { Validator } from '../core/definitions/validator';
import { ValidatorResult } from '../core/definitions/validator-result';

import { DepositInput } from './deposit.in';

export interface DepositValidator extends Validator<DepositInput> {
  validate(request: DepositInput): ValidatorResult;
}
