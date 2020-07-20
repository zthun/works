import { ZDatabaseOptionsBuilder } from './database-options-builder.class';
import { IZDatabaseOptions } from './database-options.interface';
import { assertBuilderSetsProperty, assertBuilderCopiesObject, assertBuilderAssignsObject } from '@zthun/works.jest';

describe('ZDatabaseOptionsBuilder', () => {
  function createTestTarget() {
    return new ZDatabaseOptionsBuilder();
  }

  describe('Properties', () => {
    it('sets the database.', () => {
      assertBuilderSetsProperty(
        'database',
        createTestTarget,
        (t, v) => t.database(v),
        (o: IZDatabaseOptions) => o.database
      );
    });

    it('sets the URL.', () => {
      assertBuilderSetsProperty(
        'mongodb://database.zthunworks.com',
        createTestTarget,
        (t, v) => t.url(v),
        (o: IZDatabaseOptions) => o.url
      );
    });
  });

  describe('Copy', () => {
    it('copies all properties.', () => {
      const expected = createTestTarget().database('database').url('mongodb://database.zthunworks.com').timeout(500).build();
      assertBuilderCopiesObject(expected, createTestTarget);
    });
  });

  describe('Assign', () => {
    it('updates properties in the builder.', () => {
      const expected = createTestTarget().database('database').url('mongodb://database.zthunworks.com').build();
      assertBuilderAssignsObject(expected, () => createTestTarget().url(expected.url), { database: 'database' });
    });
  });
});
