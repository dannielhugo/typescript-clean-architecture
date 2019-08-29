import * as Module from 'joi';

import { ValidatorResult } from '../../app/core/definitions/validator-result';
import { DepositInput } from '../../app/deposit/deposit.in';
import { DepositValidator } from '../../app/deposit/deposit.validator';

type Joi = typeof Module;

export class DepositValidatorImpl implements DepositValidator {
  private joi: Joi;
  private schema: Module.ObjectSchema;

  constructor(joi: Joi) {
    this.joi = joi;
    this.schema = this.joi.object().keys({
      userId: this.joi.alternatives().try(joi.string(), joi.number()),
      value: this.joi
        .number()
        .min(10)
        .max(1000)
        .required(),
    });
  }

  validate(request: DepositInput): ValidatorResult {
    const joiResult = this.joi.validate(request, this.schema);
    return { valid: joiResult.error === null, error: joiResult.error };
  }
}
