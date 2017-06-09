import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import { scopePerRequest, Request } from 'awilix-express';
import { DependencyResolver } from './dependency-resolver';

import { list as accountList } from './adapters/controllers/account.ctrl';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

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
    this.express.use(scopePerRequest(DependencyResolver.register()));
    this.express.use((req: Request, res, next) => {
      req.container.registerValue({
        user: req.user
      });
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', accountList);
    this.express.use('/', router);
  }

}

export default new App().express;
