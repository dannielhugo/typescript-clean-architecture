/* eslint-disable @typescript-eslint/no-explicit-any */

import { asClass, asValue, AwilixContainer, createContainer, InjectionMode } from 'awilix';

interface Constructor<T> {
  new (...args: any[]): T;
}

interface Dependency {
  name: string;
  useClass?: Constructor<any>;
  useValue?: any;
}

let container: AwilixContainer;

class TestEnvironment {
  static createInstance<T>(constructorFn: Constructor<T>, deps?: Dependency[]): T {
    container = createContainer({ injectionMode: InjectionMode.CLASSIC });

    container.register(constructorFn.name, asClass(constructorFn));

    if (deps) {
      deps.forEach(dp => {
        if (dp.useClass) {
          container.register(dp.name, asClass(dp.useClass).singleton());
        } else if (dp.useValue) {
          container.register(dp.name, asValue(dp.useValue));
        }
      });
    }
    return container.resolve<T>(constructorFn.name);
  }

  static get<T>(name: string): T {
    return container.resolve<T>(name);
  }
}

export { TestEnvironment };
