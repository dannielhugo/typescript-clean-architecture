import * as Module from 'joi';

import { ValidatorResult } from '../../app/core/definitions/validator-result';
import { TransferInput } from '../../app/transfer/transfer.in';
import { TransferValidator } from '../../app/transfer/transfer.validator';

type Joi = typeof Module;

export class TransferValidatorImpl implements TransferValidator {
  private joi: Joi;
  private schema: Module.ObjectSchema;

  constructor(joi: Joi) {
    this.joi = joi;
    this.schema = this.joi.object().keys({
      from: this.joi.alternatives().try(joi.string(), joi.number()),
      to: this.joi.alternatives().try(joi.string(), joi.number()),
      value: this.joi
        .number()
        .min(10)
        .max(1000)
        .required(),
    });
  }

  validate(request: TransferInput): ValidatorResult {
    const joiResult = this.joi.validate(request, this.schema);
    return { valid: joiResult.error === null, error: joiResult.error };
  }
}
