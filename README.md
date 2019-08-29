# Typescript Clean Architecture

## Intro

Typescript + Clean architecture

:warning:  This is still (and maybe will always be) under development! Any PR is greatly welcome!

This project tries to follow the rules of [Uncle Bob's Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Project structure
```
.
├── src
|   ├── app                   - Enterprise business rules
|   |   ├── core              - Core business rules
|   |   |   ├── entities      - Interfaces and classes that defines the app.
|   |   |   └── definitions   - Interfaces and classes complement the app.
|   |   └── {feat-name}       - Business features
|   ├── data                  - Interfaces adapters
|   └── frameworks            - Frameworks and drivers that exposes the app
└── build                     - Compiled javascript files
```

## Install

- Clone the project
- Install dependencies:
  - Using yarn
  ```bash
  $ yarn install
  ```

  - Using npm
  ```bash
  $ npm install
  ```

## Running

- Running the script

  This will run a single node script file and will execute pre-defined methods as an example.

    - Using yarn
    ```bash
    $ yarn start:script
    ```
    - Using npm
    ```bash
    $ npm run start:script
    ```

- Running the Rest Server

  This will start an express rest server at localhost:3000. You can use [this example](src/frameworks/api/Example.md) to consume endpoints.

    - Using yarn
    ```bash
    $ yarn start:api
    ```
    - Using npm
    ```bash
    $ npm run start:api
    ```

## Executing tests
  - Using yarn
  ```bash
  $ yarn test
  ```
  - Using npm
  ```bash
  $ npm test
  ```