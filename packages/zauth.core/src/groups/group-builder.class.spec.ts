import { ZGroupBuilder } from './group-builder.class';
import { IZGroup } from './group.interface';

describe('ZGroupBuilder', () => {
  function createTestTarget() {
    return new ZGroupBuilder();
  }

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZGroupBuilder) => ZGroupBuilder, actualFn: (user: IZGroup) => T) {
      // Arrange
      const target = createTestTarget();
      // Act
      const user = buildFn(target).build();
      const actual = actualFn(user);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('sets the id.', () => {
      const id2 = 'test-id-2';
      assertPropertySet(id2, (t) => t.id(id2), (g) => g._id);
    });

    it('sets the name.', () => {
      const name = 'Test Name';
      assertPropertySet(name, (t) => t.name(name), (g) => g.name);
    });

    it('sets the system flag', () => {
      assertPropertySet(true, (t) => t.system(), (g) => g.system);
    });
  });

  describe('Copy', () => {
    it('copies another group.', () => {
      // Arrange
      const expected = createTestTarget().name('copied-group').id('copy').build();
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
      const original = createTestTarget().id('p-id').name('p-name').build();
      const expected = createTestTarget().copy(original).name('updated-name').build();
      const target = createTestTarget().copy(original);
      // Act
      const actual = target.assign({ name: expected.name }).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
