# Description

Zthunworks Nest services implement standard distributable services that can be reused across applications for consistency.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

There are quite a few dependencies that this package requires. Double check after installation and follow instructions to install of the needed dependency packages.

```sh
# NPM
npm install @zthun/works.nest
# Yarn
yarn add @zthun/works.nest
```

This package is divided into modules that automatically add specific http routes and services to your application without you having to add additional implementation. This package is built around the [nestjs](https://nestjs.com/) framework.

## Users Module

![Users](images/png/works.nest.users.png)

The users module only concerns itself with CRUD based operations and management of IZUser objects. This module provides a single service, ZUsersService, as the users repository to make queries on the underlying user database.

The connection to the database is a mongo database and is accessed via the following environment variables, in order of priority.

```ts
/**
 * The full connection string to the database that houses the users.
 */
process.env.DATABASE_USERS_URL;
/**
 * Treated the same as DATABASE_USERS_URL, but used as a shortcut in case you decide to house everything in a single database.
 */
process.env.DATABASE_URL;
```

Once you have the environment variables set, you can list, query, create, update, and delete users at your whim. Note that the users controller exposes no public routes to access the users in the database. If you want automatic routes to deal with token and profile management, use the **ZAuthModule** instead. Note that you should NOT return these users directly as the users returned from this module contain the data directly from the database and that includes the users hashed passwords and any other sensitive information that should not be public.

```ts
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZProfileBuilder, IZProfile } from '@zthun/works.core';
import { ZUsersModule } from '@zthun/works.nest';

@Controller('profiles')
export class ProfilesController {
  public constructor(private readonly _users: ZUsersService) {}

  @Get()
  public async list(): Promise<IZProfile[]> {
    const users = await this._users.list();
    return users.map((usr) => new ZProfileBuilder().user(usr).build());
  }

  @Get('id')
  public async read(@Param('id') id: string): IZProfile {
    const user = await this._users.findById(id);
    return new ZProfileBuilder().user(usr).build();
  }
}

@Module({
  imports: [ZUsersModule]
  controllers: [MyController]
})
export class MyApp {}
```

## Vault Module

![Vault](images/png/works.nest.vault.png)

The vault module deals with cross configuration concerns by placing all system configuration in a single database. The vault module is similar to the **ZUsersModule** in that it does not add any routes for you. You will also need some environment variables set for this.

```ts
/**
 * The full connection string to the database that houses the vault configurations.
 */
process.env.DATABASE_VAULT_URL;
/**
 * Treated the same as DATABASE_VAULT_URL, but used as a shortcut in case you decide to house everything in a single database.
 */
process.env.DATABASE_URL;
```

Once you have the environment variables set, you can list, query, create, update, and delete vault configurations. Remember that these are system settings, so you probably won't want to expose them to your users.

```ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/works.core';
import { ZVaultService, ZVaultModule } from '@zthun/works.nest';

@Injectable()
export class MyService implements OnModuleInit {
  public static readonly SCOPE = 'authentication';
  public static readonly KEY_JWT = 'jwt';

  public constructor(private readonly _vault: ZVaultService) {}

  public async onModuleInit(): Promise<any> {
    // Note that this will force the default value to be set if it is not already set.
    return Promise.all([this.jwt()]);
  }

  public async jwt(): Promise<IZConfigEntry<string>> {
    const config = new ZConfigEntryBuilder<string>().scope(ZAuthConfigService.SCOPE).key(ZAuthConfigService.KEY_JWT).generate().build();
    return this._vault.get<string>(config);
  }
}


@Module({
  imports: [ZVaultModule]
  controllers: [MyController]
})
export class MyApp {}
```

## Notifications Module

![Notifications](images/png/works.nest.notifications.png)

The notifications module is a small module that is responsible for sending message notifications to users. The primary service in this module is the **ZEmailModule** which requires an smtp server and an email to send.

```ts
import {
  ZServerBuilder,
  ZEmailEnvelopeBuilder,
  ZEmailBuilder
} from '@zthun/works.core';
import { ZEmailService, ZNotificationsModule } from '@zthun/works.nest';

@Injectable()
export class MyService {
  public constructor(private _email: ZEmailService) {}

  public sendActivationEmail(from: string, to: string): Promise<IZEmail> {
    const server = new ZServerBuilder()
      .address('smtp.email-server.com')
      .build();
    const envelope = new ZEmailEnvelopeBuilder().to(to).from(from).build();
    const subject = 'Activation successful';
    const message = 'You have successfully activated your account.';
    const email = new ZEmailBuilder()
      .message(message)
      .subject(subject)
      .envelope(envelope)
      .build();
    await this._email.send(email, server);
    return email;
  }
}

@Module({
  imports: [ZNotificationsModule],
  providers: [MyService]
})
export class MyModule {}
```

## Auth Module

![Auth](images/png/works.nest.auth.png)

The auth module contains the services and controllers for authenticating a user. It has dependencies on the ZUsersModule and the ZVaultModule.

Remember that your database connection strings should be considered sensitive information and should not be checked into any source control repository. Once you have that ready, you can simply do the following to add the auth module. Note that no setup is required to initialize the users and vault databases. The value database automatically gets populated with values if they do not already exist.

```ts
import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZAuthModule } from '@zthun/works.nest';
import cookieParser from 'cookie-parser';

@Module({
  imports: [ZAuthModule]
})
export class MyApp {}
```

### Routes

The auth module adds the following routes.

```ts
/**
 * Returns the current profile
 */
@Get('profiles');

/**
 * Updates a profile
 */
@Put('profiles');
@Body(ZProfileUpdateDto)

/**
 * Creates a new account.
 */
@Post('profiles');
@Body(ZProfileCreateDto)

/**
 * Deletes the profile defined by the cookie.
 *
 * This is a non reversible action.
 */
@Delete('profiles');

/**
 * Activates a profile.
 */
@Put('profiles/activations');
@Body(ZProfileActivationUpdateDto)

/**
 * Creates a new activation token.
 */
@Post('profile/activations');
@Body(ZProfileActivationCreateDto)

/**
 * Deactivates the user.
 *
 * This does not delete the profile.  It
 * simply requires the user to construct a new activation code.
 */
@Delete('profile/activations');

/**
 * Creates an account recovery temp password.
 */
@Post('profiles/recoveries');
@Body(ZProfileRecoveryCreateDto);

/**
 * Verifies the current token cookie.
 */
@Get('tokens')

/**
 * Does a login and creates a new token for the user.
 */
@Post('tokens')
@Body(ZTokensLoginDto)

/**
 * Destroys the current cookie and invalids the current login session.
 */
@Delete('tokens')
```

## Health Module

![Health](images/png/works.nest.health.png)

The final module that this package provides is the health module that adds a single route to your application. This route has no restrictions behind it, requires no user authentication, and always returns a 200 return code.

```ts
import { ZHealthModule } from '@zthun/works.nest';

@Module({})
export class MyApp {}
```

The following is the route that gets added.

```ts
/**
 * Returns a 200 return code.
 */
@Get('health')
```
