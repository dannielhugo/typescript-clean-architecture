import * as debug from 'debug';
import { createContainer, listModules, Lifetime, AwilixContainer, ResolutionMode } from 'awilix';

export class DependencyResolver {
  static register(): AwilixContainer {
    const container = createContainer();

    container.loadModules([
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

    debug('app:dependency-resolver')(container.registrations);
    return container;
  }


}
