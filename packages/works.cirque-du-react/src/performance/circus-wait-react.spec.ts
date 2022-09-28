/* eslint-disable require-jsdoc */
import { stubFalse } from 'lodash';
import { ZCircusWaitReact } from './circus-wait-react';

describe('ZCircusWaitReact', () => {
  function createTestTarget() {
    return new ZCircusWaitReact();
  }

  it('should reject if the wait predicate never becomes true', async () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    // Assert.
    await expect(() => target.wait(stubFalse)).rejects.toBeTruthy();
  });

  it('should resolve once the wait predicate becomes true', async () => {
    // Arrange.
    const predicate = jest.fn();
    predicate.mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValue(true);
    const target = createTestTarget();
    // Act.
    await target.wait(predicate);
    // Assert.
    expect(true).toBeTruthy();
  });
});
