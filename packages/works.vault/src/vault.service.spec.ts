/**
 * @jest-environment node
 */
/* eslint-disable require-jsdoc */
import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/works.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/works.dal';
import { ZVaultCollections } from './vault.database';
import { ZVaultService } from './vault.service';

describe('ZVaultService', () => {
  let mongo: ZDatabaseMemory;
  let dal: IZDatabase;
  let configA: IZConfigEntry;
  let configB: IZConfigEntry;

  function createTestTarget() {
    return new ZVaultService(dal);
  }

  beforeAll(async () => {
    mongo = await ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('vault-service-test').build());
    await mongo.start();
    dal = mongo;
  });

  afterAll(async () => {
    await mongo.kill();
  });

  beforeEach(async () => {
    configA = new ZConfigEntryBuilder().scope('common').key('domain').value('zthunworks.com').build();
    configB = new ZConfigEntryBuilder().scope('authentication.secrets').key('jwt').generate().build();

    [configA, configB] = await dal.create(ZVaultCollections.Configs, [configA, configB]).run();
  });

  afterEach(async () => {
    await dal.delete(ZVaultCollections.Configs).run();
  });

  describe('Get', () => {
    describe('by key', () => {
      it('will retrieve the existing value.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = new ZConfigEntryBuilder().copy(configA).build();
        configA.value = 'not-correct';
        // Act
        const actual = await target.get({ entry: configA });
        // Assert
        expect(actual).toEqual(expected);
      });

      it('will add the default value if the key does not exist.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = true;
        const cfg = new ZConfigEntryBuilder().scope('common').key('secure').value(expected).build();
        // Act
        await target.get({ entry: cfg });
        cfg.value = !expected;
        const actual = await target.get({ entry: cfg });
        // Assert
        expect(actual.value).toEqual(expected);
      });

      it('is synchronized if multiple get requests come in at the same time.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = true;
        const cfg = new ZConfigEntryBuilder().scope('common').key('secure').value(expected).build();
        // Act
        const [one, two, three] = await Promise.all([target.get({ entry: cfg }), target.get({ entry: cfg }), target.get({ entry: cfg })]);
        const actual = one.value || two.value || three.value;
        // Assert
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Put', () => {
    describe('by key', () => {
      it('will add a key that does not exist.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = new ZConfigEntryBuilder<boolean>().scope('common').key('secure').value(true).build();
        // Act
        const actual = await target.put({ entry: expected });
        // Assert
        expect(actual).toEqual(expected);
      });

      it('will update an existing key if it exists.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = new ZConfigEntryBuilder().scope('common').key('secure').value(true).build();
        // Act
        await target.put({ entry: expected });
        expected.value = true;
        const actual = await target.put({ entry: expected });
        // Assert
        expect(actual).toEqual(expected);
      });

      it('is synchronized if multiple get requests come in at the same time.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = new ZConfigEntryBuilder().scope('common').key('secure').value(true).build();
        const payload = { entry: expected };
        // Act
        await Promise.all([target.put(payload), target.put(payload), target.put(payload)]);
        const actual = await target.get(payload);
        // Assert
        expect(actual).toEqual(expected);
      });
    });
  });
});
