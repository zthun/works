import { ZAuthModule } from './auth.module';

describe('ZAuthModule', () => {
  async function createTestTarget() {
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
