import { CustomError } from '../../../app/core/definitions/custom-error';

export class GeneralErrorImpl extends CustomError {
  name = 'generalError';

  constructor() {
    super();
  }

  toString(): string {
    return `${this.name}`;
  }
}
