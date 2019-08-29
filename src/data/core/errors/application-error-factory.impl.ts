import { ApplicationErrorFactory } from '../../../app/core/definitions/application-error-factory';
import { CustomError, ErrorDataType } from '../../../app/core/definitions/custom-error';
import { ERRORS } from './errors';

export class ApplicationErrorFactoryImpl implements ApplicationErrorFactory {
  getError(name: string, data?: ErrorDataType): CustomError {
    const errorImpl = ERRORS[name as keyof typeof ERRORS] || ERRORS['general'];
    const params = data || {};

    errorImpl.initialize(params);
    return errorImpl;
  }
}
