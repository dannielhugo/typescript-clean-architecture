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

import { Injector } from './config/injector';
import { config } from './config/config';

interface Request extends express.Request {
  container: AwilixContainer;
  user: {};
}

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public injector: Injector;
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
    this.injector = new Injector(createContainer, listModules, asValue, ResolutionMode, Lifetime);
    this.injector.registerValue({ router: this.router });
    // Core injections
    this.injector.registerModule([
      [`${__dirname}/../../application/business/**/*.js`, { lifetime: Lifetime.SCOPED }],
      [`${__dirname}/../../external/storages/${config.storage}/**/*.js`, { lifetime: Lifetime.SINGLETON }],
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

    for (const schema of schemas) {
      this.injector.registerValue({
        [camelcase(schema.name)]: require(schema.path)
      });
    }
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
      [`${__dirname}/../../external/plugins/**/*.js`, { lifetime: Lifetime.SCOPED }]
    ]);
  }
}

export default new App().express;
