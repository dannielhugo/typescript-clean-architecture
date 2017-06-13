import {
  createContainer,
  Lifetime,
  AwilixContainer,
  ResolutionMode,
  RegistrationOptions
} from 'awilix';

export class Injector {
  public container: AwilixContainer;

  constructor() {
    this.container = createContainer();
  }

  registerValue(value: { [key: string]: any }): void {
    this.container.registerValue(value);
  }

  registerModule(globPattern: string[] | [string, RegistrationOptions][]): void {
    this.container.loadModules(globPattern, {
      formatName: 'camelCase',
      cwd: '.',
      registrationOptions: {
        resolutionMode: ResolutionMode.CLASSIC
      }
    });
  }

}
