/* eslint-disable require-jsdoc */
import { ZAlertBuilder } from './alert-builder.class';
import { ZAlertStack } from './alert-stack.class';
import { IZAlert } from './alert.interface';

describe('AlertStack', () => {
  let success: IZAlert;
  let info: IZAlert;
  let warn: IZAlert;
  let error: IZAlert;

  function createTestTarget(max?: number) {
    return max ? new ZAlertStack(max) : new ZAlertStack();
  }

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    success = new ZAlertBuilder().success().message('A successful operation has happened.').time(500).build();
    info = new ZAlertBuilder().info().message('A quick information message.').time(1000).build();
    warn = new ZAlertBuilder().warning().message('Warning, not good.').time(0).build();
    error = new ZAlertBuilder().error().message('Failure').immortal().build();
  });

  describe('Adding', () => {
    it('adds an alert to list.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.add(success);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('does not add a duplicate alert.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      target.add(error);
      const actual = target.add(error);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('adds to the front of the list.', () => {
      // Arrange
      const target = createTestTarget();
      const expected = [success, info, warn, error];
      // Act
      target.add(error);
      target.add(warn);
      target.add(info);
      target.add(success);
      // Assert
      expect(target.list).toEqual(expected);
    });

    it('removes all alerts beyond the max.', () => {
      // Arrange
      const target = createTestTarget(2);
      const expected = [success, info];
      // Act
      target.add(error);
      target.add(warn);
      target.add(info);
      target.add(success);
      // Assert
      expect(target.list).toEqual(expected);
    });

    it('removes the added alert after the time to live.', () => {
      // Arrange
      const target = createTestTarget(1);
      // Act
      target.add(success);
      jest.advanceTimersByTime(success.timeToLive);
      // Assert
      expect(target.list).toEqual([]);
    });

    it('never removes the alert if the time to live is 0.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      target.add(warn);
      jest.advanceTimersByTime(60000);
      // Assert
      expect(target.list).toEqual([warn]);
    });

    it('never removes the alert if the time to live is Infinity.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      target.add(success);
      target.add(error);
      target.add(info);
      jest.advanceTimersByTime(60000);
      // Assert
      expect(target.list).toEqual([error]);
    });
  });

  describe('Removal', () => {
    it('removes an alert.', () => {
      // Arrange
      const target = createTestTarget();
      target.add(error);
      // Act
      const actual = target.remove(error);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('removes an alert by id.', () => {
      // Arrange
      const target = createTestTarget();
      target.add(error);
      // Act
      const actual = target.remove(error._id);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('removes the correct error.', () => {
      // Arrange
      const target = createTestTarget();
      target.add(success);
      target.add(info);
      target.add(error);
      target.add(warn);
      // Act
      target.remove(info);
      target.remove(warn);
      // Assert
      expect(target.list).toEqual([error, success]);
    });

    it('does not remove an alert that does not exist.', () => {
      // Arrange
      const target = createTestTarget();
      target.add(success);
      // Act
      const actual = target.remove(error);
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
