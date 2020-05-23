import { ZLoginState } from './login-state.class';

describe('ZLoginState', () => {
  let verifyFn: jest.Mock;

  function createTestTarget() {
    return new ZLoginState(verifyFn);
  }

  beforeEach(() => {
    verifyFn = jest.fn();
    verifyFn.mockResolvedValue(true);
  });

  it('Sets the logged state to the value of the verify method (true).', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.verify();
    // Assert
    expect(actual).toBeTruthy();
  });

  it('Sets the logged state to the value of the verify method (false).', async () => {
    // Arrange
    const target = createTestTarget();
    verifyFn.mockResolvedValue(false);
    // Act
    const actual = await target.verify();
    // Assert
    expect(actual).toBeFalsy();
  });

  it('sets the logged to null when verifying.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.verify();
    // Act
    const p = target.verify();
    const actual = target.logged;
    await p;
    // Assert
    expect(actual).toBeNull();
  });

  it('raises the change event when verifying.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.verify();
    const expected = jest.fn();
    const sub = target.change.subscribe(expected);
    // Act
    const p = target.verify();
    sub.unsubscribe();
    await p;
    // Assert
    expect(expected).toHaveBeenCalledTimes(1);
    expect(expected).toHaveBeenCalledWith(null);
  });
});
