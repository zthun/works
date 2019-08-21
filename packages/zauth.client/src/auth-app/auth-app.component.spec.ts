import { ZAuthAppComponent } from './auth-app.component';

describe('ZAuthAppComponent', () => {
  function createTestTarget() {
    return new ZAuthAppComponent();
  }

  it('can create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
