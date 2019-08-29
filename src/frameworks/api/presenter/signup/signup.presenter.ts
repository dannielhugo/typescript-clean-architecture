import { ID } from '../../../../app/core/definitions/id';
import { Presenter, PresenterOutput } from '../../../../app/core/definitions/presenter';
import { SignupOutput } from '../../../../app/signup/signup.out';

export interface SignupPresenterOutput extends PresenterOutput {
  id: ID;
}

export interface SignupPresenter extends Presenter<SignupOutput> {
  present(data: SignupOutput): Promise<SignupPresenterOutput>;
}
