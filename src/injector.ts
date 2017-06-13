import * as debug from 'debug';
import * as config from './config/config.json';
import { createContainer, listModules, Lifetime, AwilixContainer, ResolutionMode } from 'awilix';

export class Injector {
  public container: AwilixContainer;

  constructor() {
    this.container = createContainer();
  }

  registerValue(value: { [key: string]: any }): void {
    this.container.registerValue(value);
  }

  registerRepositories(): void {
    this.container.loadModules([
      [`${__dirname}/storage/${(<any>config).storage}/**/*.js`, Lifetime.SINGLETON]
    ], {
        formatName: 'camelCase',
        cwd: '.',
        registrationOptions: {
          resolutionMode: ResolutionMode.CLASSIC
        }
      });

    // debug('app:dependency-resolver')(this.container.registrations);
  }

  registerAll(): void {
    this.container.loadModules([
      [`${__dirname}/business/**/*.js`, Lifetime.TRANSIENT],
      [`${__dirname}/services/**/*.js`, Lifetime.SINGLETON],
      [`${__dirname}/web/**/*.js`, Lifetime.SINGLETON],
      [`${__dirname}/adapters/**/*.js`, Lifetime.SINGLETON]
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
