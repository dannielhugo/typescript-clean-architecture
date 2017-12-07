import {
  AwilixContainer,
  RegistrationOptions,
  ModuleDescriptor
} from 'awilix';

export class Injector {
  public container: AwilixContainer;

  constructor(
    private createContainer,
    private listModules,
    private asValue,
    private ResolutionMode,
    private Lifetime
  ) {
    this.container = createContainer();
  }

  registerValue(value: { [key: string]: any }): void {
    const reg = Object.keys(value).reduce((sofar, key) => {
      sofar[key] = this.asValue(value[key]);

      return sofar;
    }, {});

    this.container.register(reg);
  }

  registerModule(globPattern: string[] | [string, RegistrationOptions][]): void {
    this.container.loadModules(globPattern, {
      formatName: 'camelCase',
      cwd: '.',
      registrationOptions: {
        resolutionMode: this.ResolutionMode.CLASSIC,
        lifetime: this.Lifetime.SINGLETON
      }
    });
  }

  list(globPattern: string[] | [string, RegistrationOptions][]): ModuleDescriptor[] {
    return this.listModules(globPattern, {
      cwd: '.'
    });
  }

}
