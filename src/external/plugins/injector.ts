import {
  createContainer,
  listModules,
  Lifetime,
  AwilixContainer,
  ResolutionMode,
  RegistrationOptions,
  ModuleDescriptor,
  asValue
} from 'awilix';

export class Injector {
  public container: AwilixContainer;

  constructor() {
    this.container = createContainer();
  }

  registerValue(value: { [key: string]: any }): void {
    const reg = Object.keys(value).reduce((sofar, key) => {
      sofar[key] = asValue(value[key]);

      return sofar;
    }, {});

    this.container.register(reg);
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

  listModules(globPattern: string[] | [string, RegistrationOptions][]): ModuleDescriptor[] {
    return listModules(globPattern, {
      cwd: '.'
    });
  }

}
