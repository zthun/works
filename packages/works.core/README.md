# Description

This is the main data contract package for @zthun scoped projects. It contains a collection of interfaces and object builders which represents different structures throughout the Zthunworks system.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

```sh
# NPM
npm install @zthun/works.core
# Yarn
yarn add @zthun/works.core
```

## Usage

All data contracts are divided into separate categories of usage, but the overwhelming majority of them follow the same structure and pattern.

### Builders

![Builder Pattern](images/png/works.core.builders.png)

Zthunworks heavily makes use of the builder pattern to construct objects instead of Typescript classes since the overwhelming majority of these objects are meant to be sent over the internet. By using a builder, we can retrieve a plain javascript object which will not lose its prototype when serializing and deserializing. All builders are implicit and do not implement a given interface. Instead, they follow a common pattern described below.

```ts
type ZBuilder<T> = {
  /**
   * Returns the built object.
   *
   * This should be a copy of the built object and not the internal object being built.
   *
   * @returns A deep copy of the built object.
   */
  build: () => T;

  /**
   * Copies an already built object into the builder to compose with later.
   *
   * @param other The object to deep copy.  This can be a shallow copy if other only has primitive types.
   *
   * @returns The builder object.
   */
  copy?: (other: T) => this;

  /**
   * Takes a partial object implementation of T and assigns the set properties to the builder object.
   *
   * @param other The object to assign to the builder object.
   *
   * @returns The builder object.
   */
  assign?: (other: Partial<T>) => this;
};
```

### Configuration

![Configuration Vault](images/png/works.core.config-entry.png)

A configuration entry in the Zthunworks system is represented by the **IZConfigEntry** interface and uses the _ZConfigEntryBuilder_ object to construct them. These come back from the vault database and are used to hold system configuration that a normal user will not ever see.

A configuration entry is divided into 3 parts. The configuration scope, the key, and the value. Keys must be unique in their given scope, but you can have the same named key in different scopes.

> Best practice: The scope is the system configuration for the application that is currently running and the key is the name of the configuration. There should always be a root scope called default or common which all applications will access for shared configuration.

The following table is an example of a vault database that may exist with configuration entries:

| Scope   | Key       | Value      |
| ------- | --------- | ---------- |
| common  | domain    | zthunworks |
| common  | log-level | ERROR      |
| foo-app | retries   | 5          |

Here, the vault has three configurations, with two common scopes and one for foo-app. While any app could access any configuration, it would be best for foo-app to only access configurations under common and foo-app. This forces a good separation between application configuration, but still provides a central repository for configuration.

```ts
import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/works.core';

function createDefaultDomainConfig(): IZConfigEntry {
  const config: IZConfigEntry = new ZConfigEntryBuilder()
    .scope('common')
    .key('domain')
    .value('zthunworks')
    .build();
  return config;
}
```

### Email

![Email Messages](images/png/works.core.email.png)

Emails are a common way to notify users of upcoming site news, but in the Zthunworks system, they are used to validate accounts and help recover lost passwords.

Email objects are split into three categories: the email itself, the email envelope, and the individual contacts involved with the envelope.

- The main email is represented by the **IZEmail** interface and uses the _ZEmailBuilder_ to construct it.
- The email envelope is represented by the **IZEmailEnvelope** and uses the _ZEmailEnvelopeBuilder_ to construct it.
- The email contact is represented **IZEmailContact** and uses the _ZEmailContactBuilder_ to construct it.

```ts
import {
  IZEmail,
  IZEmailEnvelope,
  IZEmailContact,
  ZEmailBuilder,
  ZEmailEnvelopeBuilder,
  ZEmailContactBuilder
} from '@zthun/works.core';

function createEmailMessageToAdmin(msg: string, subject: string) {
  const current: IZEmailContact = getCurrentUserEmailAddress();
  const admin = new ZEmailContactBuilder()
    .address('admin@zthunworks.com')
    .display('Admin')
    .type('email-message')
    .build();
  const envelope: IZEmailEnvelope = new ZEmailEnvelopeBuilder()
    .from(current)
    .to(admin)
    .build();
  const email: IZEmail = new ZEmailBuilder()
    .envelope(envelope)
    .message(msg)
    .subject(subject)
    .build();
  return email;
}
```

### Errors

![Error Handling](images/png/works.core.error.png)

Dealing with errors server side is common, but the main issue is localization. When you have an error happen on the server, it is best to just send back an error code instead of a raw text message. This way, when the error is returned to the user, it is translated according to the culture zone that the user is currently in. The standard error object is the **IZError** interface and the _ZErrorBuilder_ is used to construct it.

At minimum, errors should have a code, and this can be the standard HTTP error codes that are returned to browsers. Optionally, errors may have the type, a sub-code or list of sub-codes that further describes what happened, and an english friendly message or array of messages that describe the code or sub-codes. Why english, and not spanish or other languages? It's because the developer who developed this only speaks english and he needed a way to quickly identify errors that came back from the server. Technically, this can be any language you want it to be in, and you can use it is the primary display message, but it is recommended not to.

HTTP error codes are conveniently located for you using the **ZHttpCode\*** enums.

| Enum                           | Range   |
| ------------------------------ | ------- |
| ZHttpCodeInformationalResponse | 100-199 |
| ZHttpCodeSuccess               | 200-299 |
| ZHttpCodeRedirection           | 300-399 |
| ZHttpCodeClient                | 400-499 |
| ZHttpCodeServer                | 500-599 |

```ts
import { IZError, ZErrorBuilder } from '@zthun/works.core';

function createErrorForUnhandledException(msg: string, type: string) {
  const error = new ZErrorBuilder(ZHttpCodeServer.InternalServerError)
    .type(type)
    .english(msg)
    .build();
  return error;
}
```

### Authentication

![User Manipulation](images/png/works.core.users.png)

Managing users and auth is divided into three separate types.

- The **IZLogin** is constructed with the _ZLoginBuilder_ and is used to send credentials for a user not logged in, or for those users that do not currently have an existing account. This object should _**NEVER**_ be saved in the database.
- The **IZProfile** is constructed with the _ZProfileBuilder_ and it contains the semi-private information for the user that can be modified by said user. This object should _**NEVER**_ be saved in the database.
- The **IZUser** is constructed with the _ZUserBuilder_ and contains all the public, semi-private, and private information. This object is stored in the database and should _**NEVER**_ be sent to a client. If you need to strip the semi-private information from this object, use the _ZProfileBuilder_ and use the **user** method.

```ts
import { IZUser, IZProfile, ZProfileBuilder } from '@zthun/works.core';

function createProfileFromUser(user: IZUser): IZProfile {
  return new ZProfileBuilder().user(user).build();
}
```

### Data

![Data Handling](images/png/works.core.data.png)

Very often, you need to sort and filter data to display it to the user.

For sorting, we have the **IZSort** and the _ZSortBuilder_ for construction. A sort is divided into two parts: the field to be sorted, and the direction to sort. Unlike most builders, the _ZSortBuilder_ will output a list of **IZSort** objects for multi-sort support.

```ts
import { IZSort, ZSortBuilder } from '@zthun/works.core';

function sortByNameThenByAge() {
  const sort: IZSort[] = new ZSortBuilder()
    .ascending('name')
    .descending('age')
    .build();
  return sort;
}
```

Filters are a bit more complicated. Filters don't have a single root interface; instead, they have a composite type that is made up of multiple interface options.

The IZFilter can be any of the following filter types with a respective builder for each type.

| Interface          | Builder                  | Description                              | Example         |
| ------------------ | ------------------------ | ---------------------------------------- | --------------- |
| IZBinaryFilter     | ZBuilderFilterBuilder    | Used for x, y comparisons.               | x == y          |
| IZCollectionFilter | ZCollectionFilterBuilder | Use to check x against a list y          | x _in_ y        |
| IZLoginFilter      | ZLogicFilterBuilder      | A composite filter x, y, joined by logic | x _and_ y       |
| IZUnaryFilter      | ZUnaryFilterBuilder      | A filter involving a single clause, x    | x _is not null_ |

```ts
import {
  IZBinaryFilter,
  IZLogicFilter,
  IZCollectionFilter,
  IZUnaryFilter,
  ZCollectionFilterBuilder,
  ZBinaryFilter,
  ZLogicFilter,
  ZUnaryFilter
} from '@zthun/works.core';

function createComplexFilter(): IZFilter {
  const ageIsSet: IZUnaryFilter = new ZUnaryFilterBuilder()
    .field('age')
    .isNotNull()
    .build();
  const ageIsAdult: IZBinaryFilter = new ZBinaryFilterBuilder()
    .field('age')
    .greaterThanEqualTo()
    .value(0)
    .build();
  const ageIsNotTwentyOneOrTwentyFive: IZCollectionFilter = new ZCollectionFilterBuilder()
    .field('age')
    .notIn()
    .values([21, 25])
    .build();
  const filter: IZLogicFilter = new ZLogicFilterBuilder()
    .and()
    .clause(ageIsSet)
    .clause(ageIsAdult)
    .clause(ageIsNotTwentyOneOrTwentyFive)
    .build();
  return filter;
}
```

### Server

![Server Identification](images/png/works.core.server.png)

You will often need to work with remote systems. Luckily, there is the **IZServer** interface with the _ZServerBuilder_ to construct it.

At minimum, you will need the address to connect to. Additionally, unless the target system is completely open and public on the default port, given the protocol, you will need to fill out the information for the port, username, and password in order to make a valid connection to a remote system. This object is especially useful if your system uses other services like smtp email servers and ftp hosts.

```ts
import { IZServer, ZServerBuilder } from '@zthun/works.core';

function createFtpServerConnection() {
  const server: IZServer = new ZServerBuilder()
    .address('ftp://my-host.info')
    .port(8922)
    .username('foo')
    .password('pa$$w0rD')
    .build();
  return server;
}
```
