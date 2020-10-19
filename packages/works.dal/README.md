# Description

This package contains the generic data access layer for @zthun scoped projects.

[![Build Status](https://travis-ci.com/zthun/works.svg?branch=master)](https://travis-ci.com/zthun/works)

## Installation

```sh
# NPM
npm install @zthun/works.dal
# Yarn
yarn install @zthun/works.dal
```

## Usage

The basic usage of the dal layer is to build up a query that you want results from and fire it off against the actual database that it is connected to. You always start by setting up a connection, either globally or as part of the query process.

```ts
import {
  IZDatabase,
  IZDatabaseOptions,
  ZDatabaseOptionsBuilder,
  ZDatabaseZDatabaseMongo
} from '@zthun/works.dal';

async function getFoo(connection: string, id: string) {
  const options = new ZDatabaseOptionsBuilder()
    .url(connection)
    .database('foo')
    .build();

  const db: IZDatabase = ZDatabaseMongo.connect(options);
  const [bar] = await db.read<any>('bars').filter({ _id: id }).run();
  return bar;
}
```

The best practice for this is to inject the database based on the framework you are using. For example, using nestjs, you can create an injectable database as such.

```ts
import { Module } from '@nestjs/common';
import { ZDatabaseMongo, ZDatabaseOptionsBuilder } from '@zthun/works.dal';
import { env } from 'process';

const FOO_DATABASE_NAME = 'foo';
const FOO_DATABASE_TOKEN = 'foo-database';
const FOO_DATABASE_URL = env.FOO_DATABASE_URL;

const DATABASE_OPTIONS = new ZDatabaseOptionsBuilder()
  .database(DATABASE_NAME)
  .url(FOO_DATABASE_URL)
  .build();

@Module({
  providers: [
    {
      provide: DATABASE_TOKEN,
      useValue: ZDatabaseMongo.connect(DATABASE_OPTIONS)
    }
  ]
})
export class MyModule {}
```

```ts
import { Inject, Injectable } from '@nestjs/common';
import { IZDatabase } from '@zthun/works.dal';

const DATABASE_TOKEN = 'foo-database';
const DATABASE_COLLECTION = 'bars';

@Injectable()
export class FooService {
  public constructor(
    @Inject(DATABASE_TOKEN) private readonly _dal: IZDatabase
  ) {}

  public list(): Promise<any[]> {
    return this._dal.read<any>(DATABASE_COLLECTION).run();
  }
}
```

## Unit Testing

There is also an in memory database used for unit testing. The in memory database will connect in the same manner that the ZMongoDatabase does, however, it will always run on port **32769** on the localhost using the mongodb protocol.

Since the database run is global, it has an unfortunate side effect of requiring cleanup and only one of them should be running at a time. If you are using jest as your testing framework, you need to make sure that jest runs with the --runInBand option to not clash and cause other tests to fail.

```ts
import {
  IZDatabase,
  ZDatabaseMemory,
  ZDatabaseOptionsBuilder
} from '@zthun/works.dal';

describe('FooService', () => {
  let dal: IZDatabase;
  let joe: any;
  let jane: any;

  beforeAll(async () => {
    await ZDatabaseMemory.start();
    const options = new ZDatabaseOptionsBuilder().database('foo-test').build();
    dal = ZDatabaseMemory.connect(options);
  });

  afterAll(async () => {
    await ZDatabaseMemory.kill();
  });

  beforeEach(async () => {
    joe = {
      name: 'Joe'
    };
    jane = {
      name: 'Jane'
    };
  });

  beforeEach(async () => {
    await dal.create('bars', [joe, jane]).run();
  });

  afterEach(async () => {
    await dal.delete('bars').run();
  });

  function createTestTarget() {
    return new FooService(dal);
  }

  describe('List', () => {
    it('returns all bars.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = [joe, jane];
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
```
