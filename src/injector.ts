import * as debug from 'debug';
import { createContainer, listModules, Lifetime, AwilixContainer, ResolutionMode } from 'awilix';

export class Injector {
  public container: AwilixContainer;

  constructor() {
    this.container = createContainer();
  }

  registerValue(value: { [key: string]: any }): void {
    this.container.registerValue(value);
  }

  registerAll(): void {
    this.container.loadModules([
      [`${__dirname}/business/**/*.js`, Lifetime.TRANSIENT],
      [`${__dirname}/services/**/*.js`, Lifetime.SINGLETON],
      [`${__dirname}/adapters/**/*.js`, Lifetime.TRANSIENT]
    ], {
        formatName: 'camelCase',
        cwd: '.',
        registrationOptions: {
          resolutionMode: ResolutionMode.CLASSIC
        }
      });

    debug('app:dependency-resolver')(this.container.registrations);
  }
}
