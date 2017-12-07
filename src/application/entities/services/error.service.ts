import { ERROR_MESSAGE } from '../data/error-message';


export default class ErrorService {
  constructor() { }

  async throw(error: string, parameteres?: { [index: string]: any }): Promise<Error> {
    let err: { error: string, message: string };

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