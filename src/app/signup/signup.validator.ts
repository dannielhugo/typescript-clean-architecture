import { Validator } from '../core/definitions/validator';
import { ValidatorResult } from '../core/definitions/validator-result';

import { SignupInput } from './signup.in';

export interface SignupValidator extends Validator<SignupInput> {
  validate(request: SignupInput): ValidatorResult;
}
