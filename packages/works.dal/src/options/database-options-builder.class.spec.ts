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

    it('sets the host.', () => {
      assertBuilderSetsProperty(
        'host',
        createTestTarget,
        (t, v) => t.host(v),
        (o: IZDatabaseOptions) => o.host
      );
    });

    it('sets the port.', () => {
      assertBuilderSetsProperty(
        3500,
        createTestTarget,
        (t, v) => t.port(v),
        (o: IZDatabaseOptions) => o.port
      );
    });

    it('sets the protocol.', () => {
      assertBuilderSetsProperty(
        'protocol',
        createTestTarget,
        (t, v) => t.protocol(v),
        (o: IZDatabaseOptions) => o.protocol
      );
    });

    it('sets the timeout.', () => {
      assertBuilderSetsProperty(
        1258,
        createTestTarget,
        (t, v) => t.timeout(v),
        (o: IZDatabaseOptions) => o.timeout
      );
    });

    it('sets the user.', () => {
      assertBuilderSetsProperty(
        'user',
        createTestTarget,
        (t, v) => t.credentials(v, 'pass'),
        (o: IZDatabaseOptions) => o.user
      );
    });

    it('sets the password.', () => {
      assertBuilderSetsProperty(
        'pass',
        createTestTarget,
        (t, v) => t.credentials('user', v),
        (o: IZDatabaseOptions) => o.password
      );
    });
  });

  describe('Copy', () => {
    it('copies all properties.', () => {
      const expected = createTestTarget().database('database').host('host').port(1234).protocol('protocol').timeout(500).build();
      assertBuilderCopiesObject(expected, createTestTarget);
    });
  });

  describe('Assign', () => {
    it('updates properties in the builder.', () => {
      const expected = createTestTarget().database('database').host('host').build();
      assertBuilderAssignsObject(expected, () => createTestTarget().host('host'), { database: 'database' });
    });
  });
});
