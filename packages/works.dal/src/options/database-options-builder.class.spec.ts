import { ZDatabaseOptionsBuilder } from './database-options-builder.class';
import { IZDatabaseOptions } from './database-options.interface';

describe('ZDatabaseOptionsBuilder', () => {
  function createTestTarget() {
    return new ZDatabaseOptionsBuilder();
  }

  function assertPropertySet<T>(expected: T, buildFn: (t: ZDatabaseOptionsBuilder, v: T) => ZDatabaseOptionsBuilder, actualFn: (o: IZDatabaseOptions) => T) {
    // Arrange
    const target = createTestTarget();
    // Act
    const options = buildFn(target, expected).build();
    const actual = actualFn(options);
    // Assert
    expect(actual).toEqual(expected);
  }

  describe('Properties', () => {
    it('sets the database.', () => {
      assertPropertySet('database', (t, v) => t.database(v), (o) => o.database);
    });

    it('sets the host.', () => {
      assertPropertySet('host', (t, v) => t.host(v), (o) => o.host);
    });

    it('sets the port.', () => {
      assertPropertySet(3500, (t, v) => t.port(v), (o) => o.port);
    });

    it('sets the protocol.', () => {
      assertPropertySet('protocol', (t, v) => t.protocol(v), (o) => o.protocol);
    });

    it('sets the timeout.', () => {
      assertPropertySet(1258, (t, v) => t.timeout(v), (o) => o.timeout);
    });
  });

  describe('Copy', () => {
    it('copies all properties.', () => {
      // Arrange
      const target = createTestTarget();
      const expected = createTestTarget().database('database').host('host').port(1234).protocol('protocol').timeout(500).build();
      // Act
      const actual = target.copy(expected).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('updates properties in the builder.', () => {
      // Arrange
      const target = createTestTarget().host('host');
      const expected = createTestTarget().database('database').host('host').build();
      // Act
      const actual = target.assign({ database: 'database' }).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
