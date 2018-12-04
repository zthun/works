import { Collection, Db, MongoClient } from 'mongodb';
import MongoMemoryServer from 'mongodb-memory-server';
import { DataAccessService } from './data-access.service.class';

const TestDatabaseName = 'test-db';
const TestDatabaseCollection = 'test-collection';

describe('DataAccessService', () => {
  let client: MongoClient;
  let mongo: MongoMemoryServer;
  let database: Db;
  let collection: Collection<any>;

  function createTestTarget() {
    return new DataAccessService();
  }

  beforeEach(async () => {
    mongo = new MongoMemoryServer({
      instance: {
        port: DataAccessService.Port,
        ip: 'localhost'
      },
    });
    client = new MongoClient(DataAccessService.connection);
    const connection = await client.connect();
    database = connection.db(TestDatabaseName);
    collection = database.collection(TestDatabaseCollection);
    await collection.deleteMany({});
    client = connection;
  });

  afterEach(async () => {
    await client.close();
    await mongo.stop();
  });

  describe('Count', () => {
    let data: any[];

    beforeEach(async () => {
      data = [
        { _id: 1, k: 1 },
        { _id: 2, k: 2 },
        { _id: 3, k: 3 }
      ];
      await collection.insertMany(data);
    });

    it('returns the item count.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.count(TestDatabaseName, TestDatabaseCollection);
      // Assert
      expect(actual).toEqual(data.length);
    });

    it('returns the item count from culling data.', async () => {
      // Arrange
      const target = createTestTarget();
      const filter = { k: 1 };
      // Act
      const actual = await target.count(TestDatabaseName, TestDatabaseCollection, filter);
      // Assert
      expect(actual).toEqual(1);
    });
  });

  describe('List', () => {
    let data: any[];

    beforeEach(async () => {
      data = [
        { _id: 1, k: 1 },
        { _id: 2, k: 2 },
        { _id: 3, k: 3 }
      ];
      await collection.insertMany(data);
    });

    it('returns the list of all objects.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const result = await target.list<any>(TestDatabaseName, TestDatabaseCollection);
      // Assert
      expect(result).toEqual(data);
    });
  });

  describe('Read', () => {
    let item: any;

    beforeEach(async () => {
      item = {
        _id: 1,
        k: 1
      };

      await collection.insertOne(item);
    });

    it('reads a single object by the id parameter.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const result = await target.read(TestDatabaseName, TestDatabaseCollection, item._id);
      // Assert
      expect(result).toEqual(item);
    });

    it('returns null if no such object exists.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const result = await target.read(TestDatabaseName, TestDatabaseCollection, 40);
      // Assert
      expect(result).toBeNull();
    });
  });

  describe('Create', () => {
    let item;

    beforeEach(() => {
      item = { _id: 1, k: 1 };
    });

    it('creates a new item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const result = await target.create(TestDatabaseName, TestDatabaseCollection, item);
      // Assert
      expect(result).toEqual(item);
    });

    it('throws an exception if the item already exists.', async () => {
      // Arrange
      const target = createTestTarget();
      await target.create(TestDatabaseName, TestDatabaseCollection, item);
      item.k = 2;
      // Act
      const actual = target.create(TestDatabaseName, TestDatabaseCollection, item);
      // Assert
      await expect(actual).rejects.toBeTruthy();
    });
  });

  describe('Update', () => {
    let oldItem;
    let newItem;

    beforeEach(async () => {
      oldItem = { _id: 1, k: 2 };
      newItem = { _id: 1, k: 1 };
      await collection.insertOne(oldItem);
    });

    it('updates the item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update(TestDatabaseName, TestDatabaseCollection, oldItem._id, newItem);
      const actual = await target.read(TestDatabaseName, TestDatabaseCollection, newItem._id);
      // Assert
      expect(actual).toEqual(newItem);
    });

    it('returns the updated item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.update(TestDatabaseName, TestDatabaseCollection, oldItem._id, newItem);
      // Assert
      expect(actual).toEqual(newItem);
    });

    it('returns null if no item is updated.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.update(TestDatabaseName, TestDatabaseCollection, 40, newItem);
      // Assert
      expect(actual).toBeNull();
    });
  });

  describe('Delete', () => {
    let item;

    beforeEach(async () => {
      item = { _id: 1, k: 1 };
      await collection.insertOne(item);
    });

    it('removes the item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.remove(TestDatabaseName, TestDatabaseCollection, item._id);
      const actual = await target.read(TestDatabaseName, TestDatabaseCollection, item._id);
      // Assert
      expect(actual).toBeNull();
    });

    it('returns true if the item was removed.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.remove(TestDatabaseName, TestDatabaseCollection, item._id);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('returns false if no item was removed.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.remove(TestDatabaseName, TestDatabaseCollection, 33);
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
