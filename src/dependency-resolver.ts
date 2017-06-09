import { createContainer, Lifetime, AwilixContainer } from 'awilix';

export class DependencyResolver {
  static register(): AwilixContainer {
    const container = createContainer();

    container.loadModules(['services/**/*.js'], {
      formatName: 'camelCase',
      registrationOptions: {
        lifetime: Lifetime.SCOPED
      }
    })

    return container;
  }
}
