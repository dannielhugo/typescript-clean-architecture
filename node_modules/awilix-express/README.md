# awilix-express

[![Build Status](https://travis-ci.org/talyssonoc/awilix-express.svg?branch=master)](https://travis-ci.org/talyssonoc/awilix-express) [![Coverage Status](https://coveralls.io/repos/github/talyssonoc/awilix-express/badge.svg?branch=master)](https://coveralls.io/github/talyssonoc/awilix-express?branch=master)

Dependency injection [Awilix 2](https://github.com/jeffijoe/awilix) helpers and scope-instantiating middleware for **Express**. 🚀

## Installation

```sh
npm install --save awilix-express
```

or

```sh
yarn add awilix-express
```

_Requires Node v6 or above_

## Usage

Add the middleware to your Express app.

```js
const { createContainer, Lifetime } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const container = createContainer();

container.registerClass({
  // Scoped lifetime = new instance per request
  // Imagine the TodosService needs a `user`.
  // class TodosService { constructor({ user }) { } }
  todosService: [TodosService, Lifetime.SCOPED]
});

container.registerValue({ theAnswer: 42 });

// Add the middleware, passing it your Awilix container.
// This will attach a scoped container on the context.
app.use(scopePerRequest(container));

// Now you can add request-specific data to the scope.
app.use((req, res, next) => {
  req.container.registerValue({
    user: req.user // from some authentication middleware..
  });

  next();
});
```

Then in your route handlers...

```js
const { inject } = require('awilix-express');
// `inject` accepts multiple parameters, not an array

router.get('/todos', inject('todosService', 'theAnswer'), (req, res) => {
  req.todosService.find().then((result) => {
    res.send({
      result,
      answer: req.theAnswer
    });
  });
});
```

You can also create invokers instead of using the `inject` middleware:

```js
// There's a makeClassInvoker for classes..
const { makeInvoker } = require('awilix-express');

function makeAPI ({ todosService }) {
  return {
    find: (req, res) => {
      return todosService.find().then((result) => {
        res.send(result);
      });
    }
  };
}

const api = makeInvoker(makeAPI);

// Creates middleware that will invoke `makeAPI`
// for each request, giving you a scoped instance.
router.get('/todos', api('find'));
```
## Why do I need it?

You can certainly use Awilix with Express without this library, but follow along and you might see why it's useful.

Imagine this simple imaginary Todos app, written in ES6:

```js
// A totally framework-independent piece of application code.
// Nothing here is remotely associated with HTTP, Express or anything.
class TodosService {
  constructor({ currentUser, db }) {
    // We depend on the current user!
    this.currentUser = currentUser;
    this.db = db;
  }

  getTodos() {
    // use your imagination ;)
    return this.db('todos').where('user', this.currentUser.id);
  }
}

// Here's a Express API that calls the service
class TodoAPI {
  constructor({ todosService }) {
    this.todosService = todosService;
  }
  getTodos(req, res) {
    return this.todosService.getTodos().then(todos => res.send(todos));
  }
}
```

So the problem with the above is that the `TodosService` needs a `currentUser` for it to function. Let's first try solving this manually, and then with `awilix-express`.

## Manual

This is how you would have to do it without Awilix at all.

```js
import db from './db'

router.get('/todos', (req, res) => {
  // We need a new instance for each request,
  // else the currentUser trick wont work.
  const api = new TodoAPI({
    todosService: new TodosService({
      db,
      // current user is request specific.
      currentUser: req.user
    });
  });

  // invoke the method.
  return api.getTodos(req, res);
});
```

Let's do this with Awilix instead. We'll need a bit of setup code.

```js
import { createContainer, Lifetime } from 'awilix';

const container = createContainer();

// The `TodosService` lives in services/TodosService
container.loadModules(['services/*.js'], {
  // we want `TodosService` to be registered as `todosService`.
  formatName: 'camelCase',
  registrationOptions: {
    // We want instances to be scoped to the Express request.
    // We need to set that up.
    lifetime: Lifetime.SCOPED
  }
});

// imagination is a wonderful thing.
app.use(someAuthenticationMethod());

// We need a middleware to create a scope per request.
// Hint: that's the scopePerRequest middleware in `awilix-express` ;)
app.use((req, res, next) => {
  // We want a new scope for each request!
  req.container = container.createScope();
  // The `TodosService` needs `currentUser`
  req.container.registerValue({
    currentUser: req.user // from auth middleware.. IMAGINATION!! :D
  });

  return next();
});
```

Okay! Let's try setting up that API again!

```js
export default function (router) {
  router.get('/todos', (req, res) => {
    // We have our scope available!
    const api = new TodoAPI(req.container.cradle); // Awilix magic!
    return api.getTodos(req, res);
  });
}
```

A lot cleaner, but we can make this even shorter!

```js
export default function (router) {
  // Just invoke `api` with the method name and
  // you've got yourself a middleware that instantiates
  // the API and calls the method.
  const api = (methodName) => {
    // create our handler
    return function (req, res) {
      const controller = new TodoAPI(req.container.cradle);
      return controller[method](req, res);
    };
  };

  // adding more routes is way easier!
  router.get('/todos', api('getTodos'));
}
```
## Using `awilix-express`

In our route handler, do the following:

```js
import { makeClassInvoker } from 'awilix-express';

export default function (router) {
  const api = makeClassInvoker(TodoAPI);
  router.get('/todos', api('getTodos'));
};
```

And in your Express application setup:

```js
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest } from 'awilix-express';

const container = createContainer();

// The `TodosService` lives in services/TodosService
container.loadModules([
  ['services/*.js', Lifetime.SCOPED] // shortcut to make all services scoped
], {
  // we want `TodosService` to be registered as `todosService`.
  formatName: 'camelCase'
});

// imagination is a wonderful thing.
app.use(someAuthenticationMethod());

// Woah!
app.use(scopePerRequest(container));
app.use((req, res, next) => {
  // We still want to register the user!
  // req.container is a scope!
  req.container.registerValue({
    currentUser: req.user // from auth middleware.. IMAGINATION!! :D
  });

  next();
});
```

Now **that** is way simpler! If you are more of a factory-function aficionado like myself, you can use `makeInvoker` in place of `makeClassInvoker`:

```js
import { makeInvoker } from 'awilix-express';

function makeTodoAPI ({ todosService }) {
  return {
    getTodos: (req, res) => {
      return todosService.getTodos().then((todos) => res.send(todos));
    }
  };
}

export default function (router) {
  const api = makeInvoker(makeTodoAPI);
  router.get('/api/todos', api('getTodos'));
};
```

That concludes the tutorial! Hope you find it useful, I know I have.

# Contributing

## `npm run` scripts

* `npm test`: Runs tests once
* `npm test -- --watch`: Runs tests in watch-mode
* `npm run lint`: Lints the code once
* `npm run coverage`: Runs code coverage using `istanbul`

# Author

Talysson - [@talyssonoc](https://twitter.com/talyssonoc)
