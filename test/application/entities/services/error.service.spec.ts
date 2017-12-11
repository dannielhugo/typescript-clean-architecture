import ErrorService from '../../../../src/application/entities/services/error.service';

describe('ErrorService', () => {
  let errorService;

  beforeAll(() => {
    errorService = new ErrorService();
  });


  it('should return a rejected promise with an existing error', async () => {
    try {
      await errorService.throw('user_exists');
    } catch (e) {
      expect(e).toEqual({
        error: 'user_exists',
        message: 'An user with supplied document already exists'
      });
    }
  });

  it('should return a rejected promise with an generical error if it is not defined', async () => {
    try {
      await errorService.throw('this_error_does_not_exists');
    } catch (e) {
      expect(e).toEqual({
        error: 'server_error',
        message: 'An internal server error occurred'
      });
    }
  });

  it('should return a formatted error', async () => {
    try {
      await errorService.throw('user_not_found', {
        id: 1
      });

    } catch (e) {
      expect(e).toEqual({
        error: 'user_not_found',
        message: 'The user \'1\' was not found'
      });
    }
  });


  it('should not fail for invalid parameters', async () => {
    try {
      await errorService.throw('user_not_found', {
        id: 1,
        this_not_exists: 1
      });

    } catch (e) {
      expect(e).toEqual({
        error: 'user_not_found',
        message: 'The user \'1\' was not found'
      });
    }
  });

  it('should not fail for not supplied parameter', async () => {
    try {
      await errorService.throw('user_not_found', {
        this_not_exists: 1
      });

    } catch (e) {
      expect(e).toEqual({
        error: 'user_not_found',
        message: 'The user \':id\' was not found'
      });
    }
  });


});