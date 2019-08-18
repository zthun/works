import { ZAuthAppModule } from './auth-app.module';

describe('ZAuthAppModule', () => {
  function createTestTarget() {
    return new ZAuthAppModule();
  }

  it('can create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
