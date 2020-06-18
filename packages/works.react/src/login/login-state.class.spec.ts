import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { ZLoginState } from './login-state.class';

describe('ZLoginState', () => {
  let profile: IZProfile;
  let refreshFn: jest.Mock;

  function createTestTarget() {
    return new ZLoginState(refreshFn);
  }

  beforeEach(() => {
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').super().build();

    refreshFn = jest.fn();
    refreshFn.mockResolvedValue(profile);
  });

  it('sets the profile to the value of the refresh method.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.refresh();
    // Assert
    expect(actual).toEqual(profile);
  });

  it('raises the profile change event.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.refresh();
    const expected = jest.fn();
    target.profileChange.subscribe(expected);
    // Act
    const actual = await target.refresh();
    // Assert
    expect(expected).toHaveBeenCalledWith(actual);
  });

  it('sets the profile to undefined when refreshing.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.refresh();
    // Act
    const p = target.refresh();
    const actual = target.profile;
    await p;
    // Assert
    expect(actual).toBeUndefined();
  });

  it('raises the change event when verifying.', async () => {
    // Arrange
    const target = createTestTarget();
    await target.refresh();
    const expected = jest.fn();
    const sub = target.profileChange.subscribe(expected);
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
    target.profileChange.subscribe(expected);
    refreshFn.mockRejectedValue('Failed');
    // Act
    await target.refresh();
    // Assert
    expect(expected).toHaveBeenCalledWith(null);
  });
});
