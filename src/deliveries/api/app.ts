import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as camelcase from 'camelcase';
import * as debug from 'debug';
import * as lodash from 'lodash';
import * as ajv from 'ajv';

import {
  AwilixContainer,
  Lifetime,
  asValue,
  createContainer,
  InjectionMode
} from 'awilix';

import { NameFormatter } from 'awilix/lib/load-modules';
import { listModules } from 'awilix/lib/list-modules';

import { config } from './config/config';

interface Request extends express.Request {
  container: AwilixContainer;
  user: {};
}

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public container: AwilixContainer;
  public router: express.Router;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.router = express.Router();
    this.container = createContainer();
    this.container.register({ router: asValue(this.router) });

    this.injectModules();
    this.injectStorage();
    this.injectFiles();
    this.injectExternalLibraries();
    this.injectSchemas();
    this.injectPlugins();

    this.express.use((req: Request, res, next) => {
      req.container = this.container.createScope();

      req.container.register({
        user: asValue(req.user)
      });
      next();
    });
  }

  // Inject base app Modules
  private injectModules(): void {
    // Core injections
    this.registerModule([
      [`${__dirname}/../../application/business/**/*.js`, { lifetime: Lifetime.SCOPED }],
      [`${__dirname}/../../application/entities/services/**/*.js`, { lifetime: Lifetime.SINGLETON }]
    ]);
  }

  /**
   *  Inject repository based on config.storage value.
   *  With this we may be able to swap between repository storages
   */
  private injectStorage(): void {
    // transform something.repo.repository into repoRepository
    const formatter = <NameFormatter>(name, descriptor) => {
      const splat = name.split('.');
      splat.shift();

      return camelcase(splat.join('.'));
    };

    this.registerModule([
      [`${__dirname}/../../external/repositories/${config.storage}/**/*.js`, { lifetime: Lifetime.SINGLETON }]
    ], formatter);
  }

  // Inject any other file that was not previosly registered
  private injectFiles(): void {
    this.registerModule([
      [`${__dirname}/**/*.js`, { lifetime: Lifetime.SINGLETON }]
    ]);
  }

  // Configure API endpoints.
  private routes(): void {
    const routes = this.list([`${__dirname}/routes/**/*.js`]);

    for (const route of routes) {
      this.container.resolve(camelcase(route.name));
    }

    this.express.use('/', this.router);
  }

  // Inject Schemas
  private injectSchemas(): void {
    const schemas = this.list([`${__dirname}/schemas/**/*.js`]);
    const schemaList = {};

    for (const schema of schemas) {
      schemaList[camelcase(schema.name)] = require(schema.path);
    }

    this.registerValue({
      schemas: schemaList
    });
  }

  private injectExternalLibraries(): void {
    this.registerValue({
      'lodash': lodash,
      'ajv': ajv,
      'debug': debug
    });
  }


  // Inject Plugins
  private injectPlugins(): void {
    this.registerModule([
      [`${__dirname}/plugins/**/*.js`, { lifetime: Lifetime.SCOPED }]
    ]);
  }

  private registerValue(value: { [key: string]: any }): void {
    const reg = Object.keys(value).reduce((sofar, key) => {
      sofar[key] = asValue(value[key]);

      return sofar;
    }, {});

    this.container.register(reg);
  }

  private registerModule(
    globPattern,
    formatName?
  ): void {
    this.container.loadModules(globPattern, {
      formatName: formatName || 'camelCase',
      cwd: '.',
      resolverOptions: {
        injectionMode: InjectionMode.CLASSIC,
        lifetime: Lifetime.SINGLETON
      }
    });
  }

  private list(globPattern) {
    return listModules(globPattern, {
      cwd: '.'
    });
  }
}

export default new App().express;
