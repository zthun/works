/* eslint-disable require-jsdoc */
import { createMocked } from '@zthun/works.jest';
import { ZLogEntryBuilder } from '../log/log-entry';
import { ZConsoleLogger } from './console-logger';

describe('ZConsoleLogger', () => {
  let msg: string;
  let scope: string;
  let cons: jest.Mocked<Console>;

  function createTestTarget() {
    return new ZConsoleLogger(cons);
  }

  beforeEach(() => {
    msg = 'Something is being logged.';
    scope = 'Test.ConsoleLogger';
    cons = createMocked(['log', 'error', 'warn']);
  });

  describe('Levels', () => {
    it('should log an info message to the console.', () => {
      // Arrange
      const target = createTestTarget();
      const entry = new ZLogEntryBuilder().message(msg).scope(scope).info().build();
      // Act
      target.log(entry);
      // Assert
      expect(cons.log).toHaveBeenCalledWith(`[${entry.created.toLocaleString()}] (${entry.scope}): ${entry.message}`);
    });

    it('should log a warning message to the console.', () => {
      // Arrange
      const target = createTestTarget();
      const entry = new ZLogEntryBuilder().message(msg).scope(scope).warning().build();
      // Act
      target.log(entry);
      // Assert
      expect(cons.warn).toHaveBeenCalledWith(`[${entry.created.toLocaleString()}] (${entry.scope}): ${entry.message}`);
    });

    it('should log a error message to the console.', () => {
      // Arrange
      const target = createTestTarget();
      const entry = new ZLogEntryBuilder().message(msg).scope(scope).error().build();
      // Act
      target.log(entry);
      // Assert
      expect(cons.error).toHaveBeenCalledWith(`[${entry.created.toLocaleString()}] (${entry.scope}): ${entry.message}`);
    });

    it('should log a catastrophe message to the console.', () => {
      // Arrange
      const target = createTestTarget();
      const entry = new ZLogEntryBuilder().message(msg).scope(scope).catastrophe().build();
      // Act
      target.log(entry);
      // Assert
      expect(cons.error).toHaveBeenCalledWith(`[${entry.created.toLocaleString()}] (${entry.scope}): ${ZConsoleLogger.FATAL} - ${entry.message}`);
    });
  });

  describe('Scope', () => {
    it('is excluded if it is not set.', () => {
      // Arrange
      const target = createTestTarget();
      scope = null;
      const entry = new ZLogEntryBuilder().message(msg).info().build();
      // Act
      target.log(entry);
      // Assert
      expect(cons.log).toHaveBeenCalledWith(`[${entry.created.toLocaleString()}]: ${entry.message}`);
    });
  });
});
