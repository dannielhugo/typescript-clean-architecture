# Typescript Clean Architecture Example

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
|   |   └── definitions       - Some interfaces and classes that defines our app.
|   |       ├── contracts     - Contracts between business and deliveries
|   |       └── entities      - Application entities
|   ├── delivery              - Here is located all delivery options
|   |   └── api               - API delivery. Here comes all API related logic
|   |       ├── config        - Config folder
|   |       ├── controllers   - Here lies all controllers
|   |       ├── middlewares   - Express middlewares goes here
|   |       ├── routes        - Express routes
|   |       ├── schemas       - JSON Schema definitions for input validation
|   |       └── index.ts      - API entrypoint
|   └── external              - Some external dependencies, like databases and D.I
|       ├── adapters          - Specify how data is transported from delivery to API
|       ├── plugins           - External plugins, like D.I
|       └── storage           - Storage definitions
└── dist                      - Compiled javascript files
```


## Delivery Options

For now there is only one delivery option, which is by exposing an API for account
management.

- [API DELIVERY DOCS](docs/API.md)

## Installing and Running

```bash
$ yarn install
$ yarn start
```
