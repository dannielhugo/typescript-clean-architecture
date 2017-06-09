import { createContainer, listModules, Lifetime, AwilixContainer, ResolutionMode } from 'awilix';

export class DependencyResolver {
  static register(): AwilixContainer {
    const container = createContainer();

    container.loadModules(['./services/**/*.js'], {
      formatName: 'camelCase',
      registrationOptions: {
        resolutionMode: ResolutionMode.CLASSIC,
        lifetime: Lifetime.SINGLETON
      }
    });

    container.loadModules(['./business/**/*.js'], {
      formatName: 'camelCase',
      registrationOptions: {
        resolutionMode: ResolutionMode.CLASSIC,
        lifetime: Lifetime.SCOPED
      }
    });

    console.log(listModules(['./services/**/*.js']));

    return container;
  }
}
