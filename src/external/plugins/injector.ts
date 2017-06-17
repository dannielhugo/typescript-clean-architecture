import {
  createContainer,
  listModules,
  Lifetime,
  AwilixContainer,
  ResolutionMode,
  RegistrationOptions,
  ModuleDescriptor
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
        resolutionMode: ResolutionMode.CLASSIC,
        lifetime: Lifetime.SINGLETON
      }
    });
  }

  registerFunction(value: { [name: string]: Function }): void {
    this.container.registerFunction(value);
  }

  listModules(globPattern: string[] | [string, RegistrationOptions][]): ModuleDescriptor[] {
    return listModules(globPattern, {
      cwd: '.'
    });
  }

}
