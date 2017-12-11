import { ERROR_MESSAGE } from '../data/error-message';

/**
 * Represents an error with an identifier and a message
 */
type ErrorType = { error: string, message: string };

/**
 * Service responsible for managing error messages
 */
export default class ErrorService {
  constructor() { }

  /**
   * Returns a rejected promise with the error message correctly described
   */
  async throw(error: string, parameteres?: { [index: string]: any }): Promise<ErrorType> {
    let err: ErrorType;

    if (ERROR_MESSAGE[error]) {
      err = {
        error: error,
        message: ERROR_MESSAGE[error]
      };
    } else {
      err = {
        error: 'server_error',
        message: ERROR_MESSAGE.server_error
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