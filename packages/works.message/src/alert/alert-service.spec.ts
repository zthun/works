/* eslint-disable require-jsdoc */
import { unset } from 'lodash';
import { v4 } from 'uuid';
import { IZAlert, ZAlertBuilder } from './alert';
import { ZAlertService } from './alert-service';

describe('ZAlertService', () => {
  let success: IZAlert;
  let info: IZAlert;
  let warn: IZAlert;
  let error: IZAlert;
  let _target: ZAlertService;

  function createTestTarget(max?: number) {
    _target = new ZAlertService(max);
    return _target;
  }

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  afterEach(async () => {
    unset(global, ZAlertService.Namespace);
  });

  beforeEach(() => {
    success = new ZAlertBuilder().success().message('A successful operation has happened.').time(500).build();
    info = new ZAlertBuilder().info().message('A quick information message.').time(1000).build();
    warn = new ZAlertBuilder().warning().message('Warning, not good.').time(0).build();
    error = new ZAlertBuilder().error().message('Failure').immortal().build();
  });

  describe('Creation and retrieval', () => {
    it('returns all alerts currently stored.', async () => {
      // Arrange
      const target = createTestTarget();
      info = await target.create(info);
      error = await target.create(error);
      success = await target.create(success);
      const expected = [success, error, info];
      // Act
      const actual = await target.all();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('returns the empty list if no alerts were ever created.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.all();
      // Assert
      expect(actual).toEqual([]);
    });

    it('returns the alert with the given id.', async () => {
      // Arrange
      const target = createTestTarget();
      info = await target.create(info);
      error = await target.create(error);
      success = await target.create(success);
      // Act
      const actual = await target.get(info._id);
      // Assert
      expect(actual).toEqual(info);
    });

    it('returns a rejected promise if the alert with the given id cannot be found.', async () => {
      // Arrange
      const target = createTestTarget();
      info = await target.create(info);
      // Act
      // Assert
      await expect(target.get(success._id)).rejects.toBeTruthy();
    });

    it('pops off the last alert when the maximum number of alerts have been reached.', async () => {
      // Arrange
      const target = createTestTarget(2);
      await target.create(info);
      error = await target.create(error);
      success = await target.create(success);
      const expected = [success, error];
      // Assert
      const actual = await target.all();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Events', () => {
    it('streams in the updated list when an item is created.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = jest.fn();
      info = await target.create(info);
      error = await target.create(error);
      target.watch().subscribe(expected);
      // Act
      success = await target.create(success);
      // Assert
      expect(expected).toHaveBeenCalledWith([success, error, info]);
    });

    it('streams in the updated list when an item is removed.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = jest.fn();
      info = await target.create(info);
      error = await target.create(error);
      target.watch().subscribe(expected);
      // Act
      await target.remove(error._id);
      // Assert
      expect(expected).toHaveBeenCalledWith([info]);
    });

    it('streams in the updated list when an item is auto removed from the list.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = jest.fn();
      success = await target.create(success);
      target.watch().subscribe(expected);
      // Assert
      jest.advanceTimersByTime(success.timeToLive + 1);
      // Assert
      expect(expected).toHaveBeenCalledWith([]);
    });

    it('does not stream in anything if a removal is ignored due to an alert already being removed.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = jest.fn();
      warn = await target.create(warn);
      await target.remove(warn._id);
      target.watch().subscribe(expected);
      // Assert
      jest.advanceTimersByTime(5);
      // Assert
      expect(expected).not.toHaveBeenCalled();
    });

    it('streams in the updated list when the alerts are cleared.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = jest.fn();
      await target.create(warn);
      await target.create(success);
      target.watch().subscribe(expected);
      // Act
      await target.clear();
      // Assert
      expect(expected).toHaveBeenCalledWith([]);
    });

    it('streams in no event if the list is empty when cleared.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = jest.fn();
      target.watch().subscribe(expected);
      // Act
      await target.clear();
      // Assert
      expect(expected).not.toHaveBeenCalled();
    });
  });

  describe('Removal and clearing', () => {
    it('returns the removed alert.', async () => {
      // Arrange
      const target = createTestTarget();
      error = await target.create(error);
      warn = await target.create(warn);
      info = await target.create(info);
      // Act
      const actual = await target.remove(warn._id);
      // Assert
      expect(actual).toEqual(warn);
    });

    it('returns a rejected promise if the error does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.remove(v4())).rejects.toBeTruthy();
    });

    it('removes the alert by id.', async () => {
      // Arrange
      const target = createTestTarget();
      error = await target.create(error);
      success = await target.create(success);
      info = await target.create(info);
      const expected = [info, error];
      // Act
      await target.remove(success._id);
      const actual = await target.all();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('automatically removes the alert when the time elapses.', async () => {
      // Arrange
      const target = createTestTarget();
      success = await target.create(success);
      // Act
      jest.advanceTimersByTime(success.timeToLive + 1);
      const actual = await target.all();
      // Assert
      expect(actual).toEqual([]);
    });

    it('ignores warnings on timer tick if they have already been removed.', async () => {
      // Arrange
      const target = createTestTarget();
      warn = await target.create(warn);
      await target.remove(warn._id);
      // Act
      jest.advanceTimersByTime(5);
      const actual = await target.all();
      // Assert
      expect(actual).toEqual([]);
    });

    it('clears all alerts.', async () => {
      // Arrange
      const target = createTestTarget();
      error = await target.create(error);
      success = await target.create(success);
      info = await target.create(info);
      // Act
      await target.clear();
      const actual = await target.all();
      // Assert
      expect(actual).toEqual([]);
    });
  });
});
