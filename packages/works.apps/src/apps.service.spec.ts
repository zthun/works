/* eslint-disable require-jsdoc */
import { ZAppsService } from './apps.service';

describe('ZAppsService', () => {
  function createTestTarget() {
    return new ZAppsService();
  }

  it('should return all applications.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.listWebApps();
    // Assert
    expect(actual).toBeTruthy();
  });
});
