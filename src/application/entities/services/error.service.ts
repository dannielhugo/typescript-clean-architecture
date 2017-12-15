import { ErrorRepository } from '../repositories/error.repository';
import { ErrorType } from '../types/error-type';

/**
 * Represents an error with an identifier and a message
 */
export type Err = { error: string, message: string };

/**
 * Service responsible for managing error messages
 */
export default class ErrorService {
  constructor(
    private errorRepository: ErrorRepository
  ) { }

  /**
   * Returns a rejected promise with the error message correctly described
   */
  async throw(error: ErrorType, parameteres?: { [index: string]: any }): Promise<Err> {
    let err: Err;

    const message = await this.errorRepository.getError(error);

    if (message) {
      err = {
        error: ErrorType[error],
        message: message
      };
    } else {
      const serverErrorMessage = await this.errorRepository.getError(ErrorType.SERVER_ERROR);

      err = {
        error: 'SERVER_ERROR',
        message: serverErrorMessage || 'A server error occurred'
      };
    }

    if (parameteres) {
      err.message = this.replacePlaceholders(err.message, parameteres);
    }

    return Promise.reject(err);
  }

  /**
   * Replace placeholders with its actual value
   */
  private replacePlaceholders(message: string, parameteres: { [index: string]: any }): string {
    const params = message.match(/:[a-zA-Z0-9\_]+/g);


    return params.reduce((soFar, param) => {
      const clean = param.substring(1);
      const data = parameteres[clean];

      if (data === undefined) {
        return soFar;
      }

      return soFar.replace(param, data);
    }, message);
  }
}