import { ZAlertBuilder } from './alert-builder.class';
import { ZAlertSeverity } from './alert-severity.enum';
import { IZAlert } from './alert.interface';
describe('ZAlertBuilder', () => {
  function createTestTarget() {
    return new ZAlertBuilder();
  }

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZAlertBuilder, val: T) => ZAlertBuilder, actualFn: (alert: IZAlert) => T) {
      // Arrange
      const target = createTestTarget();
      // Act
      const user = buildFn(target, expected).build();
      const actual = actualFn(user);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('sets the message.', () => {
      assertPropertySet(
        'Message',
        (t, v) => t.success().message(v),
        (a) => a.message
      );
    });

    it('sets the time to live.', () => {
      assertPropertySet(
        1000,
        (t, v) => t.time(v).success(),
        (a) => a.timeToLive
      );
    });

    it('sets the time to live forever.', () => {
      assertPropertySet(
        Infinity,
        (t) => t.immortal().success(),
        (a) => a.timeToLive
      );
    });

    it('sets the header.', () => {
      assertPropertySet(
        'Heaer',
        (t, v) => t.header(v),
        (a) => a.header
      );
    });

    describe('SUCCESS', () => {
      it('sets the severity.', () => {
        assertPropertySet(
          ZAlertSeverity.Success,
          (t) => t.success(),
          (a) => a.severity
        );
      });
    });

    describe('WARNING', () => {
      it('sets the severity.', () => {
        assertPropertySet(
          ZAlertSeverity.Warning,
          (t) => t.warning(),
          (a) => a.severity
        );
      });
    });

    describe('INFO', () => {
      it('sets the severity.', () => {
        assertPropertySet(
          ZAlertSeverity.Info,
          (t) => t.info(),
          (a) => a.severity
        );
      });
    });

    describe('ERROR', () => {
      it('sets the severity.', () => {
        assertPropertySet(
          ZAlertSeverity.Error,
          (t) => t.error(),
          (a) => a.severity
        );
      });
    });
  });

  describe('Copy', () => {
    it('copies the other alert with the exception of the id.', () => {
      // Arrange
      const expected = createTestTarget().info().message('message').header('header').build();
      const target = createTestTarget();
      // Act
      const actual = target.copy(expected).build();
      // Assert
      expect(actual).not.toEqual(expected);
      expect(actual).toEqual(Object.assign({}, expected, { _id: actual._id }));
    });
  });

  describe('Assign', () => {
    it('assigns the properties given with the exception of the id.', () => {
      // Arrange
      const target = createTestTarget().warning().message('warning-message');
      const expected = createTestTarget().copy(target.build()).message('updated-warning').build();
      // Act
      const actual = target.assign({ message: 'updated-warning' }).build();
      // Assert
      expect(actual).not.toEqual(expected);
      expect(actual).toEqual(Object.assign({}, expected, { _id: actual._id }));
    });
  });
});
