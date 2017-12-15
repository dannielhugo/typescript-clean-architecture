import {
  AwilixContainer,
  RegistrationOptions,
  ModuleDescriptor,
  NameFormatter
} from 'awilix';

export class InjectorPlugin {
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

  registerModule(
    globPattern: string[] | [string, RegistrationOptions][],
    formatName: 'camelCase' | NameFormatter = 'camelCase'
  ): void {
    this.container.loadModules(globPattern, {
      formatName: formatName,
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
