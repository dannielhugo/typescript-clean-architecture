import ErrorService from '../../../../src/application/entities/services/error.service';
import { ErrorRepository } from '../../../../src/application/entities/repositories/error.repository';
import { ErrorType } from '../../../../src/application/entities/types/error-type';

const MESSAGES = {
  SERVER_ERROR: 'An internal server error occurred',
  USER_EXISTS: 'An user with supplied document already exists',
  USER_NOT_FOUND: 'The user \':id\' was not found'
};

describe('ErrorService', () => {
  let errorService: ErrorService;

  beforeEach(() => {
    const ErrorRepositoryMock = jest.fn<ErrorRepository>(() => ({
      getError: jest.fn(async (error: ErrorType) => {
        return Promise.resolve(MESSAGES[ErrorType[error]]);
      })
    }));
    errorService = new ErrorService(new ErrorRepositoryMock());
  });


  it('should return a rejected promise with an existing error', async () => {
    try {
      await errorService.throw(ErrorType.USER_EXISTS);
    } catch (e) {
      expect(e).toEqual({
        error: ErrorType[ErrorType.USER_EXISTS],
        message: MESSAGES.USER_EXISTS
      });
    }
  });

  it('should return a rejected promise with an generical error if it is not defined', async () => {
    try {
      await errorService.throw(100);
    } catch (e) {
      expect(e).toEqual({
        error: ErrorType[ErrorType.SERVER_ERROR],
        message: MESSAGES.SERVER_ERROR
      });
    }
  });

  it('should return a generic error message if even server error message is not defined', async () => {
    const ErrorRepositoryMock = jest.fn<ErrorRepository>(() => ({
      getError: jest.fn(async (error: ErrorType) => {
        return Promise.resolve(null);
      })
    }));

    errorService = new ErrorService(new ErrorRepositoryMock());

    try {
      await errorService.throw(100);
    } catch (e) {
      expect(e).toEqual({
        error: 'SERVER_ERROR',
        message: 'A server error occurred'
      });
    }
  });

  it('should return a formatted error', async () => {
    try {
      await errorService.throw(ErrorType.USER_NOT_FOUND, {
        id: 1
      });

    } catch (e) {
      expect(e).toEqual({
        error: ErrorType[ErrorType.USER_NOT_FOUND],
        message: 'The user \'1\' was not found'
      });
    }
  });


  it('should not fail for invalid parameters', async () => {
    try {
      await errorService.throw(ErrorType.USER_NOT_FOUND, {
        id: 1,
        this_not_exists: 1
      });

    } catch (e) {
      expect(e).toEqual({
        error: ErrorType[ErrorType.USER_NOT_FOUND],
        message: 'The user \'1\' was not found'
      });
    }
  });

  it('should not fail for not supplied parameter', async () => {
    try {
      await errorService.throw(ErrorType.USER_NOT_FOUND, {
        this_not_exists: 1
      });

    } catch (e) {
      expect(e).toEqual({
        error: ErrorType[ErrorType.USER_NOT_FOUND],
        message: 'The user \':id\' was not found'
      });
    }
  });


});