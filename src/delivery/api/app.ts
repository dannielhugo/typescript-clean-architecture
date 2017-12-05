import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as camelcase from 'camelcase';
import { AwilixContainer, Lifetime, asValue } from 'awilix';

import { Injector } from './../../external/plugins/injector';
import jsonMiddleware from './middlewares/json.middleware';
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
    this.inject();
    this.injectSchemas();

    this.express.use((req: Request, res, next) => {
      req.container = this.injector.container.createScope();

      req.container.register({
        user: asValue(req.user)
      });
      next();
    });
  }

  // Inject base app classes
  private inject(): void {
    this.injector = new Injector();
    this.injector.registerValue({ router: this.router });
    // Core injections
    this.injector.registerModule([
      [`${__dirname}/../../application/business/**/*.js`, { lifetime: Lifetime.SCOPED }],
      [`${__dirname}/../../external/storage/${config.storage}/**/*.js`, { lifetime: Lifetime.SINGLETON }],
      [`${__dirname}/**/*.js`, { lifetime: Lifetime.SINGLETON }]
    ]);

  }

  // Configure API endpoints.
  private routes(): void {
    const routes = this.injector.listModules([`${__dirname}/routes/**/*.js`]);

    for (const route of routes) {
      this.injector.container.resolve(camelcase(route.name));
    }

    this.express.use('/', this.router);
  }

  // Inject Schemas
  private injectSchemas(): void {
    const schemas = this.injector.listModules([`${__dirname}/schemas/**/*.js`]);

    for (const schema of schemas) {
      this.injector.registerValue({
        [camelcase(schema.name)]: require(schema.path)
      });
    }
  }
}

export default new App().express;
