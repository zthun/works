/**
 * @jest-environment node
 */
/* eslint-disable require-jsdoc */
import { v4 } from 'uuid';
import { IZDatabaseOptions, ZDatabaseOptionsBuilder } from '../options/database-options';
import { ZDatabaseMemory } from './database-memory';

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

  async function createTestTarget() {
    // The start isn't actually needed here, but it helps
    // to make sure that calling an already started server
    // doesn't just crash or hang the application.
    await _target.start();
    return _target;
  }

  beforeAll(async () => {
    _target = await ZDatabaseMemory.connect(options);
    await _target.start();
  });

  afterAll(async () => {
    await _target.kill();
    await _target.kill();
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
    const target = await createTestTarget();
    await target.create(source, testData).run();
    // Act
    const actual = await target.count(source).run();
    // Assert
    expect(actual).toEqual(testData.length);
  });

  it('creates and reads in memory data.', async () => {
    // Arrange
    const target = await createTestTarget();
    await target.create(source, testData).run();
    // Act
    const actual = await target.read(source).run();
    // Assert
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(testData));
  });

  it('updates in memory data.', async () => {
    // Arrange
    const target = await createTestTarget();
    await target.create(source, testData).run();
    const named = { name: 'Everyone is Jill' };
    // Act
    const actual = await target.update(source, named).run();
    // Assert
    expect(actual).toEqual(testData.length);
  });

  it('deletes in memory data.', async () => {
    // Arrange
    const target = await createTestTarget();
    await target.create(source, testData).run();
    // Act
    const actual = await target.delete(source).run();
    // Assert
    expect(actual).toEqual(testData.length);
  });
});
