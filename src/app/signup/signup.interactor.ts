import { Interactor } from '../core/definitions/interactor';
import { User } from '../core/entities/user';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';

import { SignupInput } from './signup.in';
import { SignupOutput } from './signup.out';
import { SignupRepository } from './signup.repository';
import { SignupValidator } from './signup.validator';
import { ErrorType } from '../core/definitions/error-type';

export class SignupInteractor implements Interactor {
  constructor(
    private signupValidator: SignupValidator,
    private signupRepository: SignupRepository,
    private errorFactory: ApplicationErrorFactory,
  ) {}

  async execute(request: SignupInput): Promise<SignupOutput> {
    const result = this.signupValidator.validate(request);

    if (!result.valid) {
      throw this.errorFactory.getError(ErrorType.validation, result.error);
    }

    const user = await this.signupRepository.findUserByUsername(request.username);

    if (user) {
      throw this.errorFactory.getError(ErrorType.userExists, { username: request.username });
    }

    try {
      const user: User = { ...request, balance: 0 };
      const id = await this.signupRepository.createUser(user);
      const output: SignupOutput = {
        user: {
          id,
          firstname: request.firstname,
          lastname: request.lastname,
          username: request.username,
          email: request.email,
        },
      };

      return Promise.resolve(output);
    } catch (error) {
      throw this.errorFactory.getError(ErrorType.userCreate, error);
    }
  }
}
