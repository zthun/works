# Description

Contains all of the shared objects that are used on the client and server of @zthun scoped projects.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

Please note that any dependencies that get introduced into this library will eventually be split out into their own packages that have either the hard dependency or an equivalent peer dependency.

```sh
# NPM
npm install @zthun/works.core
# Yarn
yarn add @zthun/works.core
```

## Usage

For the overwhelming majority of objects that exist in core, they follow the pattern of the object interface along with a builder used to construct them. Core does not use hard classes for implementation as many of these objects are meant to be serialized across the wire, which means that hard classes would lose their prototypes. Thus, in order to construct the objects, a builder is used.

| Contract           | Builder               | Description                                                                                                         |
| ------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| IZConfigEntry      | ZConfigEntryBuilder   | Represents a single configuration entry in the vault database.                                                      |
| IZEmail            | ZEmailBuilder         | Represents an email.                                                                                                |
| IZEmailContact     | ZEmailContactBuilder  | Represents a contact for an email. Contacts are normally represented as strings or this object.                     |
| IZEmailEnvelope    | ZEmailEnvelopeBuilder | Represents an email envelope that contains the from, to, cc, and bcc fields.                                        |
| IZError            | ZErrorBuilder         | Represents an error that has occurred in the system.                                                                |
| IZBinaryFilter     | ZBinaryFilterBuilder  | Represents a binary a compares to b type filter.                                                                    |
| IZCollectionFilter | ZCollectionFilter     | Represents a collection style, in/not in, type filter.                                                              |
| IZLoginFilter      | ZLoginFilterBuilder   | Represents filter that is a composite list of filters joined by a logical clause, and/or.                           |
| IZUnaryFilter      | ZUnaryFilterBuilder   | Represents a unary filter. Used for null checks.                                                                    |
| IZLogin            | ZLoginBuilder         | Represents a login. The client normally sends this object to authenticate.                                          |
| IZProfile          | ZProfileBuilder       | Similar to a login. This is the post login object that represents who the user is.                                  |
| IZServer           | ZServerBuilder        | Represents a remote server connection.                                                                              |
| IZSort             | ZSortBuilder          | Represents a field sort in a direction.                                                                             |
| IZUser             | ZUserBuilder          | Represents a raw user. Should never really be sent to the client. Only the server should populate this information. |

```ts
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';

function createProfile(): IZProfile {
  return new ZProfileBuilder()
    .email('wolverine@marvel.com')
    .display('Logan')
    .build();
}
```

The general interface for a builder object is almost always going to have the same form. It is an implicit interface rather than an explicit interface. The overall schema for a builder is as follows:

```ts
type ZBuilder<T> = {
  /**
   * Returns the built object.
   *
   * This should be a copy of the built object and not the internal object being built.
   *
   * @returns A copy of the built object.
   */
  build: () => T;

  /**
   * Copies an already built object into the builder to compose with later.
   *
   * @param other The object to copy.
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
