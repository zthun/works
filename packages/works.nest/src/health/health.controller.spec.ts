/* eslint-disable require-jsdoc */
import { ZHealthController } from './health.controller';

describe('ZHealthController', () => {
  function createTestTarget() {
    return new ZHealthController();
  }

  it('always returns true.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read();
    // Assert
    expect(actual).toBeTruthy();
  });
});
