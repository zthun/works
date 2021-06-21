/* eslint-disable require-jsdoc */
import { ZDataState } from './data-state.class';

describe('ZLoginState', () => {
  let data: string;
  let refreshFn: jest.Mock;

  function createTestTarget() {
    return new ZDataState<string>(data);
  }

  beforeEach(() => {
    data = 'state-0';

    refreshFn = jest.fn();
    refreshFn.mockResolvedValue(data);
  });

  it('should set the initial data.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.data;
    // Assert
    expect(actual).toEqual(data);
  });

  it('should set the initial data to undefined.', () => {
    // Arrange
    const target = new ZDataState();
    // Assert
    const actual = target.data;
    // Assert
    expect(actual).toBeUndefined();
  });

  it('should delete the data.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.set();
    const actual = target.data;
    // Assert
    expect(actual).toBeUndefined();
  });

  it('should set the data to no value.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.set(null);
    const actual = target.data;
    // Assert
    expect(actual).toBeNull();
  });

  it('should set the data to a valid value.', () => {
    // Arrange
    const target = createTestTarget();
    const expected = 'new-value';
    // Act
    target.set(expected);
    const actual = target.data;
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should raise the data change event.', () => {
    // Arrange
    const target = createTestTarget();
    const expected = jest.fn();
    target.dataChange.subscribe(expected);
    // Act
    target.set('some-new-value');
    // Assert
    expect(expected).toHaveBeenCalledTimes(1);
  });

  it('should not raise the data change event if the data  and the value being set are the same.', () => {
    // Arrange
    const target = createTestTarget();
    const unexpected = jest.fn();
    target.dataChange.subscribe(unexpected);
    // Act
    target.set(target.data);
    // Assert
    expect(unexpected).not.toHaveBeenCalled();
  });
});
