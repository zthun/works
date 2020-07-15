import { v4 } from 'uuid';
import { ZDatabaseOptionsBuilder } from '../options/database-options-builder.class';
import { IZDatabaseOptions } from '../options/database-options.interface';
import { ZDatabaseMemory } from './database-memory.class';

describe('ZDatabaseMemory', () => {
  let database: string;
  let options: IZDatabaseOptions;
  let source: string;
  let testDataA: any;
  let testDataB: any;
  let testDataC: any;
  let testDataD: any;
  let testData: any[];
  let _target: ZDatabaseMemory;

  function createTestTarget() {
    _target = ZDatabaseMemory.connect(options);
    return _target;
  }

  beforeAll(async () => {
    await ZDatabaseMemory.start();
  });

  afterAll(async () => {
    await ZDatabaseMemory.kill();
    await ZDatabaseMemory.kill();
  });

  beforeEach(async () => {
    database = 'test-db';
    source = 'test-source';
    options = new ZDatabaseOptionsBuilder().database(database).timeout(2000).build();

    testDataA = { _id: v4(), name: 'Barry' };
    testDataB = { _id: v4(), name: 'Bruce' };
    testDataC = { _id: v4(), name: 'Diana' };
    testDataD = { _id: v4(), name: 'Clark' };

    testData = [testDataA, testDataB, testDataC, testDataD];
  });

  afterEach(async () => {
    await _target.delete(source).run();
  });

  it('retrieves the document count.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.create(source, testData).run();
    // Act
    const actual = await target.count(source).run();
    // Assert
    expect(actual).toEqual(testData.length);
  });

  it('creates and reads in memory data.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.create(source, testData).run();
    // Act
    const actual = await target.read(source).run();
    // Assert
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(testData));
  });

  it('updates in memory data.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.create(source, testData).run();
    const named = { name: 'Everyone is Jill' };
    // Act
    const actual = await target.update(source, named).run();
    // Assert
    expect(actual).toEqual(testData.length);
  });

  it('deletes in memory data.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.create(source, testData).run();
    // Act
    const actual = await target.delete(source).run();
    // Assert
    expect(actual).toEqual(testData.length);
  });
});
