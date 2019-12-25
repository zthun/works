import { ZAuthModule } from './auth.module';

describe('ZAuthModule', () => {
  function createTestTarget() {
    return new ZAuthModule();
  }

  it('can create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
