# Description

Zthunworks Nest services implement standard distributable services that can be reused across applications for consistency.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

There are quite a few dependencies that this package requires.

```sh
# NPM
npm install cookie-parser
npm install @nestjs/common @nestjs/core class-transformer class-validator jsonwebtoken lodash nodemailer reflect-metadata rxjs uuid @zthun/works.core @zthun/works.dal
npm install @zthun/works.server
# Yarn
yarn add cookie-parser
yarn add @nestjs/common @nestjs/core class-transformer class-validator jsonwebtoken lodash nodemailer reflect-metadata rxjs uuid @zthun/works.core @zthun/works.dal
yarn add @zthun/works.server
```

## Usage

This package is divided into modules that automatically add specific http routes and services to your application without you having to add additional implementation. This package is built around the [nestjs](https://nestjs.com/) framework.

| Module               | Description                                                                 | Adds routes | Requires Database |
| -------------------- | --------------------------------------------------------------------------- | ----------- | ----------------- |
| ZAuthModule          | Contains services and controllers for authentication                        | Yes         | Yes               |
| ZNotificationsModule | Contains services for sending emails and messages to people.                | No          | No                |
| ZUsersModule         | Contains the services for doing user CRUD based operations and management.  | No          | Yes               |
| ZVaultModule         | Contains the services for doing CRUD base operations around configurations. | No          | Yes               |

## Auth Module

The auth module contains the services and controllers for authenticating a user. It has dependencies on the ZUsersModule and the ZVauleModule. It requires a mongo database to be set up that can be configured using environment variables for connection strings. You will need to set up one or more mongo databases with the following environment variables set.

| Variable           | Description                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| DATABASE_VAULT_URL | A connection string to the database that houses the vault configuration.                              |
| DATABASE_USERS_URL | A connection string to the database that houses the users.                                            |
| DATABASE_URL       | A fallback url that all services will use in the case that everything is housed on the same database. |

The vault url and users url should be considered secretes if they are ran in a docker container with kubernetes or swarm. Once you have that ready, you can simply do the following to add the auth module. Note that no setup is required to initialize the users and vault databases. The value database automatically gets populated with values if they do not already exist.

```ts
import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZAuthModule } from '@zthun/works.nest';
import cookieParser from 'cookie-parser';

@Module({
  imports: [ZAuthModule]
})
export class ZMainModule {
  public static async run() {
    const app = await NestFactory.create(ZMainModule);
    app.use(cookieParser());
    // This is optional, but is highly recommend for easy use with
    // the ZUrlBuilder class found in the @zthun/works.url package.
    app.setGlobalPrefix('api');
    await app.listen(3000);
  }
}

ZMainModule.run();
```

### Routes

| Route                 | Verb   | Body                        | Description                                |
| --------------------- | ------ | --------------------------- | ------------------------------------------ |
| /profiles             | GET    |                             | Returns the current profile.               |
| /profiles             | PUT    | ZProfileUpdateDto           | Updates a profile.                         |
| /profiles             | POST   | ZProfileCreateDto           | Creates a new account.                     |
| /profiles             | DELETE |                             | Deletes the profile defined by the cookie. |
| /profiles/activations | PUT    | ZProfileActivationUpdateDto | Activates a profile                        |
| /profiles/activations | POST   | ZProfileActivationCreateDto | Creates a new activation token.            |
| /profiles/activations | DELETE |                             | Deactivates the user                       |
| /profiles/recoveries  | POST   | ZProfileRecoveryCreateDto   | Creates an account recovery password.      |
| /tokens               | GET    |                             | Verify a cookie token                      |
| /tokens               | POST   | ZTokensLoginDto             | Login for an account.                      |
| /tokens               | DELETE |                             | Logout for an account                      |
