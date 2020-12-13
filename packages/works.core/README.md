# Description

This is the main data contract package for @zthun scoped projects. It contains a collection of interfaces and object builders which represents different structures though`out the Zthunworks system.

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

![ZBuilder](images/png/works.core.builders.png)

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

![IZConfigEntry](images/png/works.core.config-entry.png)

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

export function createDomainConfig(): IZConfigEntry {
  // Normally, these get read from the database, but this is just a sample of how to create a config and return it.
  return new ZConfigEntryBuilder()
    .scope('common')
    .key('domain')
    .value('zthunworks')
    .build();
}
```

### Email

![IZEmail](images/png/works.core.email.png)

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
  const current = getCurrentUserEmailAddress();
  const admin = new ZEmailContactBuilder()
    .address('admin@zthunworks.com')
    .display('Admin')
    .type('email-message')
    .build();
  const envelope = new ZEmailEnvelopeBuilder().from(current).to(admin).build();
  const email = new ZEmailBuilder()
    .envelope(envelope)
    .message(msg)
    .subject(subject)
    .build();
  return email;
}
```

### Logins, Users, and Profiles

```ts
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';

function createProfile(): IZProfile {
  return new ZProfileBuilder()
    .email('wolverine@marvel.com')
    .display('Logan')
    .build();
}
```
