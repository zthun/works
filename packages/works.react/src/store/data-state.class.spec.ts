import { ZDataState } from './data-state.class';

describe('ZLoginState', () => {
  let data: string;
  let refreshFn: jest.Mock;

  function createTestTarget() {
    return new ZDataState<string>(refreshFn);
  }

  beforeEach(() => {
    data = 'state-0';

    refreshFn = jest.fn();
    refreshFn.mockResolvedValue(data);
  });

  it('sets the profile to the value of the refresh method.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.refresh();
    // Assert
    expect(actual).toEqual(data);
  });

  it('raises the data change event.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.refresh();
    const expected = jest.fn();
    target.dataChange.subscribe(expected);
    // Act
    const actual = await target.refresh();
    // Assert
    expect(expected).toHaveBeenCalledWith(actual);
  });

  it('sets the data to undefined when refreshing.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.refresh();
    // Act
    const p = target.refresh();
    const actual = target.data;
    await p;
    // Assert
    expect(actual).toBeUndefined();
  });

  it('raises the change event when verifying.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.refresh();
    const expected = jest.fn();
    const sub = target.dataChange.subscribe(expected);
    // Act
    const p = target.refresh();
    sub.unsubscribe();
    await p;
    // Assert
    expect(expected).toHaveBeenCalledTimes(1);
    expect(expected).toHaveBeenCalledWith(undefined);
  });

  it('sets the profile to null if an error occurs retrieving the profile.', async () => {
    // Arrange
    const target = createTestTarget();
    refreshFn.mockRejectedValue('Failed');
    // Act
    const actual = await target.refresh();
    // Assert
    expect(actual).toBeNull();
  });

  it('raises the profileChange if an error occurs retrieving the profile.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.refresh();
    const expected = jest.fn();
    target.dataChange.subscribe(expected);
    refreshFn.mockRejectedValue('Failed');
    // Act
    await target.refresh();
    // Assert
    expect(expected).toHaveBeenCalledWith(null);
  });
});
