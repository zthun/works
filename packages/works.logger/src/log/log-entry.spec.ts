/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { IZLogEntry, ZLogEntryBuilder } from './log-entry';
import { ZLogLevel } from './log-level.enum';

describe('ZLogEntryBuilder', () => {
  function createTestTarget() {
    return new ZLogEntryBuilder();
  }

  describe('Properties', () => {
    it('should set the log level to catastrophe.', () => {
      assertBuilderSetsProperty(
        ZLogLevel.CATASTROPHE,
        createTestTarget,
        (t) => t.info().catastrophe(),
        (l: IZLogEntry) => l.level
      );
    });

    it('should set the log level to error.', () => {
      assertBuilderSetsProperty(
        ZLogLevel.ERROR,
        createTestTarget,
        (t) => t.info().error(),
        (l: IZLogEntry) => l.level
      );
    });

    it('should set the log level to warning.', () => {
      assertBuilderSetsProperty(
        ZLogLevel.WARNING,
        createTestTarget,
        (t) => t.info().warning(),
        (l: IZLogEntry) => l.level
      );
    });

    it('should set the log level to info.', () => {
      assertBuilderSetsProperty(
        ZLogLevel.INFO,
        createTestTarget,
        (t) => t.error().info(),
        (l: IZLogEntry) => l.level
      );
    });

    it('should set the message.', () => {
      assertBuilderSetsProperty(
        'Error Message',
        createTestTarget,
        (t, v) => t.message(v),
        (l: IZLogEntry) => l.message
      );
    });

    it('should set the scope.', () => {
      assertBuilderSetsProperty(
        'Roadblock.Login',
        createTestTarget,
        (t, v) => t.scope(v),
        (l: IZLogEntry) => l.scope
      );
    });
  });
});
