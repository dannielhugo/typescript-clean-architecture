import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import { scopePerRequest, makeInvoker, Request } from 'awilix-express';
import { AwilixContainer } from 'awilix';

import { Injector } from './injector';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public injector: Injector;
  public router: express.Router;

  //Run configuration methods on the Express instance.
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
    this.injector = new Injector();
    this.injector.registerValue({ router: this.router });
    this.injector.registerRepositories();
    this.injector.registerAll();


    this.express.use(scopePerRequest(this.injector.container));
    this.express.use((req: Request, res, next) => {
      req.container.registerValue({
        user: req.user
      });
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    this.injector.container.resolve('accountRoutes');
    this.express.use('/', this.router);
  }

}

export default new App().express;
