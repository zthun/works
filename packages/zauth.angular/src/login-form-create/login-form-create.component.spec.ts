import { ZLoginFormCreateComponent } from './login-form-create.component';

describe('ZLoginFormCreateComponent', () => {
  function createTestTarget() {
    return new ZLoginFormCreateComponent();
  }

  it('should create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
