/**
 * @jest-environment node
 */

/* eslint-disable require-jsdoc */
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getPortPromise } from 'portfinder';
import { v4 } from 'uuid';
import { IZDatabaseOptions, ZDatabaseOptionsBuilder } from '../options/database-options';
import { SortAscending } from '../query/database-query';
import { ZDatabaseMongo } from './database-mongo';

describe('ZDatabaseMongo', () => {
  let server: MongoMemoryServer;
  let options: IZDatabaseOptions;
  let url: string;
  const database = 'test-db';

  beforeAll(async () => {
    const ip = '127.0.0.1';
    const port = await getPortPromise({ host: ip, port: 37989 });
    const instance = { ip, port };

    url = `mongodb://${ip}:${port}`;
    options = new ZDatabaseOptionsBuilder().url(url).database(database).build();
    server = new MongoMemoryServer({ instance });
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  function createTestTarget(): ZDatabaseMongo {
    return ZDatabaseMongo.connect(options);
  }

  function createBadHostTestTarget(): ZDatabaseMongo {
    return ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().copy(options).url('mongodb://bad-host:1111').timeout(100).build());
  }

  describe('Connection', () => {
    function assertConnection<T>(expected: T, targetFn: () => ZDatabaseMongo, connectionFn: (t: ZDatabaseMongo) => T) {
      // Arrange
      const target = targetFn();
      // Act
      const actual = connectionFn(target);
      // Assert
      expect(actual).toEqual(expected);
    }

    function assertDefault(targetFn: () => ZDatabaseMongo, propFn: (t: ZDatabaseMongo) => any) {
      // Arrange
      const target = targetFn();
      // Act
      const actual = propFn(target);
      // Assert
      expect(actual).toBeTruthy();
    }

    it('sets the options.', () => {
      assertConnection(
        options,
        () => createTestTarget(),
        (t) => t.$options
      );
    });
    it('sets the correct database.', () => {
      assertConnection(
        database,
        () => createTestTarget(),
        (t) => t.$database
      );
    });

    it('sets the correct url.', () => {
      assertConnection(
        url,
        () => createTestTarget(),
        (t) => t.$url
      );
    });

    it('defaults the url.', () => {
      assertDefault(
        () => ZDatabaseMongo.connect(new ZDatabaseOptionsBuilder().build()),
        (t) => t.$url
      );
    });
  });

  describe('CRUD', () => {
    let fred: any;
    let barney: any;
    let wilma: any;
    let betty: any;
    let parents: any[];
    let parentsSource: string;
    let bamBam: any;
    let pebbles: any;
    let kids: any;
    let kidsSource: string;

    async function createPopulatedTarget() {
      const target = createTestTarget();
      await target.delete(parentsSource).run();
      await target.delete(kidsSource).run();
      await target.create(parentsSource, parents).run();
      await target.create(kidsSource, kids).run();
      return target;
    }

    beforeEach(async () => {
      fred = {
        _id: v4(),
        name: 'Fred'
      };
      barney = {
        _id: v4(),
        name: 'Barney'
      };
      wilma = {
        _id: v4(),
        name: 'Wilma'
      };
      betty = {
        _id: v4(),
        name: 'Betty'
      };

      bamBam = {
        _id: v4(),
        fatherId: barney._id,
        motherId: betty._id,
        name: 'BamBam'
      };

      pebbles = {
        _id: v4(),
        fatherId: fred._id,
        motherId: wilma._id,
        name: 'Pebbles'
      };

      parentsSource = 'flintstones-parents';
      parents = [fred, barney, wilma, betty];
      kidsSource = 'flintstones-kids';
      kids = [bamBam, pebbles];
    });

    describe('Create', () => {
      it('adds one item to the database.', async () => {
        // Arrange
        const target = createTestTarget();
        // Act
        const actual = await target.create(parentsSource, [fred]).run();
        // Assert
        expect(actual.length).toEqual(1);
        expect(actual[0]._id).toEqual(fred._id);
        expect(actual[0].name).toEqual(fred.name);
      });

      it('adds all items to the database.', async () => {
        // Arrange
        const cmp = (x, y) => (x < y ? -1 : x > y ? 1 : 0);
        const target = createTestTarget();
        const expected = parents.map((p) => p.name);
        expected.sort(cmp);
        // Act
        const actual = await target.create(parentsSource, parents).run();
        const names = actual.map((p) => p.name);
        names.sort(cmp);
        // Assert
        expect(names).toEqual(expected);
      });

      it('constructs ids for all documents that do not have the _id field set.', async () => {
        // Arrange
        const target = createTestTarget();
        delete fred._id;
        delete wilma._id;
        // Act
        const actual = await target.create(parentsSource, parents).run();
        // Assert
        actual.forEach((doc) => expect(typeof doc._id).toEqual('string'));
      });

      it('rejects if a connection cannot be established.', async () => {
        // Arrange
        const target = createBadHostTestTarget();
        // Act
        const query = target.create(parentsSource, parents);
        // Assert
        await expect(query.run()).rejects.toBeTruthy();
      });
    });

    describe('Read', () => {
      it('reads all data.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        const actual = await target.read(parentsSource).run();
        // Assert
        expect(actual).toEqual(parents);
      });

      it('reads filtered data.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        const actual = await target
          .read(parentsSource)
          .filter({ name: { $eq: fred.name } })
          .run();
        // Assert
        expect(actual).toEqual([fred]);
      });

      it('sorts the data.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        const expected = parents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        // Act
        const actual = await target.read(parentsSource).sort('name', SortAscending).run();
        // Assert
        expect(actual).toEqual(expected);
      });

      it('returns page data if the page size is set.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        const actual = await target.read(parentsSource).size(2).page(0).run();
        // Assert
        expect(actual).toEqual([fred, barney]);
      });

      it('returns the correct page.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        const actual = await target.read(parentsSource).size(2).page(1).run();
        // Assert
        expect(actual).toEqual([wilma, betty]);
      });

      it('returns the empty array if retrieving any pages beyond the last.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        const actual = await target.read(parentsSource).size(parents.length).page(1).run();
        // Assert
        expect(actual).toEqual([]);
      });

      it('returns the remaining items on the last page.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        const actual = await target.read(parentsSource).size(3).page(1).run();
        // Assert
        expect(actual).toEqual([betty]);
      });

      it('joins the data.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        const expected = [Object.assign({}, bamBam, { father: [barney], mother: [betty] }), Object.assign({}, pebbles, { father: [fred], mother: [wilma] })];
        // Act
        const actual = await target.read(kidsSource).join(parentsSource, 'fatherId', '_id', 'father').join(parentsSource, 'motherId', '_id', 'mother').run();
        // Assert
        expect(actual).toEqual(expected);
      });

      it('rejects if a connection cannot be established.', async () => {
        // Arrange
        const target = createBadHostTestTarget();
        // Act
        const query = target.read(parentsSource);
        // Assert
        await expect(query.run()).rejects.toBeTruthy();
      });
    });

    describe('Update', () => {
      let template: any;

      beforeEach(() => {
        template = { name: 'Dino' };
      });

      it('updates all items that match the filter.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        const expected = [Object.assign({}, fred, template), Object.assign({}, barney, template), wilma, betty];
        // Act
        await target
          .update(parentsSource, template)
          .filter({ name: { $in: ['Fred', 'Barney'] } })
          .run();
        const actual = await target.read(parentsSource).run();
        // Assert
        expect(actual).toEqual(expected);
      });

      it('updates all items.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        const expected = parents.map((doc) => Object.assign({}, doc, template));
        // Act
        await target.update(parentsSource, template).run();
        const actual = await target.read(parentsSource).run();
        // Assert
        expect(actual).toEqual(expected);
      });

      it('returns the total number of items updated.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        const actual = await target.update(parentsSource, template).run();
        // Assert
        expect(actual).toEqual(parents.length);
      });

      it('rejects if a connection cannot be established.', async () => {
        // Arrange
        const target = await createBadHostTestTarget();
        // Act
        const query = target.update(parentsSource, template);
        // Assert
        await expect(query.run()).rejects.toBeTruthy();
      });
    });

    describe('Delete', () => {
      it('deletes one document.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        await target
          .delete(parentsSource)
          .filter({ _id: { $eq: barney._id } })
          .run();
        const actual = await target.read(parentsSource).run();
        // Act
        expect(actual).toEqual([fred, wilma, betty]);
      });

      it('deletes multiple documents.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        await target
          .delete(parentsSource)
          .filter({ _id: { $in: [fred._id, barney._id] } })
          .run();
        const actual = await target.read(parentsSource).run();
        // Act
        expect(actual).toEqual([wilma, betty]);
      });

      it('deletes all documents.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        await target.delete(parentsSource).run();
        const actual = await target.read(parentsSource).run();
        // Assert
        expect(actual.length).toEqual(0);
      });

      it('returns the number of documents deleted.', async () => {
        // Arrange
        const target = await createPopulatedTarget();
        // Act
        const actual = await target.delete(parentsSource).run();
        // Assert
        expect(actual).toEqual(parents.length);
      });

      it('rejects if a connection cannot be established.', async () => {
        // Arrange
        const target = createBadHostTestTarget();
        // Act
        const query = target.delete(parentsSource);
        // Assert
        await expect(query.run()).rejects.toBeTruthy();
      });
    });
  });
});
