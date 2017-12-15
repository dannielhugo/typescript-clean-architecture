# Typescript Clean Architecture Example

[![CircleCI](https://circleci.com/gh/dannielhugo/typescript-clean-architecture/tree/master.svg?style=svg)](https://circleci.com/gh/dannielhugo/typescript-clean-architecture/tree/master)

:warning:  This is still under development!

This is a simple implementation of an account management using typescript and
Uncle Bob's Clean Architecture concepts.

I used [awilix](https://github.com/jeffijoe/awilix) to develop a Dependency Injection in this project.

> It still under development, so things might (and will) change along the way.

## Folder structure
```
.
├── src
|   ├── application           - Application files. The core of clean architecture
|   |   ├── business          - Business logic goes here
|   |   └── entities          - Some interfaces and classes that defines our app.
|   |       ├── repositories  - Contracts between business and deliveries
|   |       ├── types         - Application custom types and interfaces
|   |       └── services      - Features that can be shared through the application
|   ├── delivery              - Here is located all delivery options
|   |   └── api               - API delivery. Here comes all API related logic
|   |       ├── config        - Config folder
|   |       ├── controllers   - Here lies all controllers
|   |       ├── middlewares   - Express middlewares goes here
|   |       ├── routes        - Express routes
|   |       ├── plugins       - API External plugins, like Lodash
|   |       ├── schemas       - JSON Schema definitions for input validation
|   |       ├── index.ts      - API entrypoint
|   |       └── app.ts        - Here is where all things are glued together
|   └── external              - Some external dependencies, like databases, libraries, etc
|       └── repositories      - Contract implementations
├── test                      - Application tests
└── build                     - Compiled javascript files
```


## Delivery Options

For now there is only one delivery option, which is being exposed as an API for account management.

- [API DELIVERY DOCS](docs/API.md)

## Installing and Running

- Using yarn
```bash
$ yarn install
$ yarn start
```

- Using npm
```bash
$ npm install
$ npm start
```

## Testing

Simply run `npm test` or `yarn test`