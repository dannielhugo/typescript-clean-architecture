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
  asClass,
  createContainer,
  ResolutionMode,
  listModules
} from 'awilix';

import { InjectorPlugin } from './plugins/injector.plugin';
import { config } from './config/config';

interface Request extends express.Request {
  container: AwilixContainer;
  user: {};
}

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public injector: InjectorPlugin;
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
    this.injectModules();
    this.injectStorage();
    this.injectFiles();
    this.injectExternalLibraries();
    this.injectSchemas();
    this.injectPlugins();

    this.express.use((req: Request, res, next) => {
      req.container = this.injector.container.createScope();

      req.container.register({
        user: asValue(req.user)
      });
      next();
    });
  }

  // Inject base app Modules
  private injectModules(): void {
    this.injector = new InjectorPlugin(createContainer, listModules, asValue, ResolutionMode, Lifetime);
    this.injector.registerValue({ router: this.router });
    // Core injections
    this.injector.registerModule([
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

    this.injector.registerModule([
      [`${__dirname}/../../external/repositories/${config.storage}/**/*.js`, { lifetime: Lifetime.SINGLETON }]
    ], formatter);
  }

  // Inject any other file that was not previosly registered
  private injectFiles(): void {
    this.injector.registerModule([
      [`${__dirname}/**/*.js`, { lifetime: Lifetime.SINGLETON }]
    ]);
  }

  // Configure API endpoints.
  private routes(): void {
    const routes = this.injector.list([`${__dirname}/routes/**/*.js`]);

    for (const route of routes) {
      this.injector.container.resolve(camelcase(route.name));
    }

    this.express.use('/', this.router);
  }

  // Inject Schemas
  private injectSchemas(): void {
    const schemas = this.injector.list([`${__dirname}/schemas/**/*.js`]);
    const schemaList = {};

    for (const schema of schemas) {
      schemaList[camelcase(schema.name)] = require(schema.path);
    }

    this.injector.registerValue({
      schemas: schemaList
    });
  }

  private injectExternalLibraries(): void {
    this.injector.registerValue({
      'lodash': lodash,
      'ajv': ajv,
      'debug': debug
    });
  }


  // Inject Plugins
  private injectPlugins(): void {
    this.injector.registerModule([
      [`${__dirname}/plugins/**/*.js`, { lifetime: Lifetime.SCOPED }]
    ]);
  }
}

export default new App().express;
