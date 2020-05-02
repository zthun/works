import { ZPermissionBuilder } from './permission-builder.class';
import { IZPermission } from './permission.interface';

describe('ZPermissionBuilder', () => {
  function createTestTarget() {
    return new ZPermissionBuilder();
  }

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZPermissionBuilder) => ZPermissionBuilder, actualFn: (user: IZPermission) => T) {
      // Arrange
      const target = createTestTarget();
      // Act
      const user = buildFn(target).build();
      const actual = actualFn(user);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('sets the id.', () => {
      const id = 'test-id';
      assertPropertySet(id, (t) => t.id(id), (p) => p._id);
    });

    it('sets the name.', () => {
      const name = 'Test Name';
      assertPropertySet(name, (t) => t.name(name), (p) => p.name);
    });

    it('sets the description.', () => {
      const desc = 'Test Description';
      assertPropertySet(desc, (t) => t.description(desc), (p) => p.description);
    });

    it('sets the system flag.', () => {
      assertPropertySet(true, (t) => t.system(), (p) => p.system);
    });
  });

  describe('Copy', () => {
    it('copies another permission.', () => {
      // Arrange
      const expected = createTestTarget().name('copied-permission').id('copy').description('This should be copied').build();
      const target = createTestTarget();
      // Act
      const actual = target.copy(expected).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('assigns updated properties.', () => {
      // Arrange
      const original = createTestTarget().id('p-id').name('p-name').description('old-description').build();
      const expected = createTestTarget().copy(original).description('updated-description').build();
      const target = createTestTarget().copy(original);
      // Act
      const actual = target.assign({ description: expected.description }).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
