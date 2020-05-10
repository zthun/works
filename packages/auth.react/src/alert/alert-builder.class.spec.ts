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

    describe('SUCCESS', () => {
      it('sets the severity.', () => {
        assertPropertySet(
          ZAlertSeverity.Success,
          (t) => t.success(),
          (a) => a.severity
        );
      });

      it('defaults the header.', () => {
        assertPropertySet(
          ZAlertSeverity.Success.toUpperCase(),
          (t) => t.success(),
          (a) => a.header
        );
      });

      it('keeps an already set header.', () => {
        assertPropertySet(
          'Header',
          (t, v) => t.header(v).success(),
          (a) => a.header
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

      it('defaults the header.', () => {
        assertPropertySet(
          ZAlertSeverity.Warning.toUpperCase(),
          (t) => t.warning(),
          (a) => a.header
        );
      });

      it('keeps an already set header.', () => {
        assertPropertySet(
          'Header',
          (t, v) => t.header(v).warning(),
          (a) => a.header
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

      it('defaults the header.', () => {
        assertPropertySet(
          ZAlertSeverity.Info.toUpperCase(),
          (t) => t.info(),
          (a) => a.header
        );
      });

      it('keeps an already set header.', () => {
        assertPropertySet(
          'Header',
          (t, v) => t.header(v).info(),
          (a) => a.header
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

      it('defaults the header.', () => {
        assertPropertySet(
          ZAlertSeverity.Error.toUpperCase(),
          (t) => t.error(),
          (a) => a.header
        );
      });

      it('keeps an already set header.', () => {
        assertPropertySet(
          'Header',
          (t, v) => t.header(v).error(),
          (a) => a.header
        );
      });
    });
  });

  describe('Copy', () => {
    it('copies the other alert.', () => {
      // Arrange
      const expected = createTestTarget().info().message('message').header('header').build();
      const target = createTestTarget();
      // Act
      const actual = target.copy(expected).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('assigns the properties given.', () => {
      // Arrange
      const target = createTestTarget().warning().message('warning-message');
      const expected = createTestTarget().copy(target.build()).message('updated-warning').build();
      // Act
      const actual = target.assign({ message: 'updated-warning' }).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
