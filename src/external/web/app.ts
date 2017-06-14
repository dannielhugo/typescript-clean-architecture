import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as camelcase from 'camelcase';

import { scopePerRequest, makeInvoker, Request } from 'awilix-express';
import { AwilixContainer, Lifetime } from 'awilix';

import { Injector } from './../config/injector';
import * as config from './../config/config.json';

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
    this.inject();


    this.express.use(scopePerRequest(this.injector.container));
    this.express.use((req: Request, res, next) => {
      req.container.registerValue({
        user: req.user
      });
      next();
    });
  }

  private inject(): void {
    this.injector = new Injector();
    this.injector.registerValue({ router: this.router });
    this.injector.registerModule([`${__dirname}/../../application/business/**/*.js`, Lifetime.TRANSIENT]);
    this.injector.registerModule([`${__dirname}/../../adapters/**/*.js`, Lifetime.SINGLETON]);
    this.injector.registerModule([`${__dirname}/**/*.js`, Lifetime.SINGLETON]);
    this.injector.registerModule([`${__dirname}/../storage/${(<any>config).storage}/**/*.js`, Lifetime.SINGLETON]);
  }

  // Configure API endpoints.
  private routes(): void {
    this.injector.container.resolve('accountRoutes');
    const routes = this.injector.listModules([`${__dirname}/routes/**/*.js`]);

    for (let route of routes) {
      this.injector.container.resolve(camelcase(route.name));
    }

    this.express.use('/', this.router);
  }

}

export default new App().express;
