import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/works.core';
import { Collections } from '../common/collections.enum';
import { ZConfigsService } from './configs.service';

describe('ZConfigsService', () => {
  let dal: IZDatabase;
  let configA: IZConfigEntry;
  let configB: IZConfigEntry;

  function createTestTarget() {
    return new ZConfigsService(dal);
  }

  beforeAll(() => {
    dal = ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('user-controller-test').build());
  });

  beforeEach(async () => {
    configA = new ZConfigEntryBuilder().scope('common').key('domain').value('zthunworks.com').build();
    configB = new ZConfigEntryBuilder().scope('authentication.secrets').key('jwt').generate().build();

    [configA, configB] = await dal.create(Collections.Configs, [configA, configB]).run();
  });

  afterEach(async () => {
    await dal.delete(Collections.Configs).run();
  });

  describe('Get', () => {
    describe('by key', () => {
      it('will retrieve the existingn value.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = new ZConfigEntryBuilder().copy(configA).build();
        configA.value = 'not-correct';
        // Act
        const actual = await target.get(configA);
        // Assert
        expect(actual).toEqual(expected);
      });

      it('will add the default value if the key does not exist.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = true;
        const cfg = new ZConfigEntryBuilder().scope('common').key('secure').value(expected).build();
        // Act
        await target.get(cfg);
        cfg.value = !expected;
        const actual = await target.get(cfg);
        // Assert
        expect(actual.value).toEqual(expected);
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
        const actual = await target.put(expected);
        // Assert
        expect(actual).toEqual(expected);
      });

      it('will update an existing key if it exists.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = new ZConfigEntryBuilder().scope('common').key('secure').value(true).build();
        // Act
        await target.put(expected);
        expected.value = true;
        const actual = await target.put(expected);
        // Assert
        expect(actual).toEqual(expected);
      });
    });
  });
});
