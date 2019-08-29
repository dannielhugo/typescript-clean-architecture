import * as Module from 'joi';

import { ValidatorResult } from '../../app/core/definitions/validator-result';
import { SignupInput } from '../../app/signup/signup.in';
import { SignupValidator } from '../../app/signup/signup.validator';

type Joi = typeof Module;

export class SignupValidatorImpl implements SignupValidator {
  private joi: Joi;
  private schema: Module.ObjectSchema;

  constructor(joi: Joi) {
    this.joi = joi;
    this.schema = this.joi.object().keys({
      firstname: this.joi
        .string()
        .regex(/^[a-zA-Z0-9\s]{3,30}$/)
        .required(),
      lastname: this.joi
        .string()
        .regex(/^[a-zA-Z0-9\s]{3,30}$/)
        .required(),
      email: this.joi.string().email({ minDomainAtoms: 2 }),
      username: this.joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      password: this.joi.string().regex(/^[a-zA-Z0-9\s]{3,30}$/),
    });
  }

  validate(request: SignupInput): ValidatorResult {
    const joiResult = this.joi.validate(request, this.schema);
    return { valid: joiResult.error === null, error: joiResult.error };
  }
}
