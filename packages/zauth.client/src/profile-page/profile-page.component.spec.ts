import { Router } from '@angular/router';
import { ZCreateAccountPageUrl, ZForgotPageUrl } from '../auth-app/auth-app.routes';
import { ZProfilePageComponent } from './profile-page.component';

describe('ZProfilePageComponent', () => {
  function createTestTarget() {
    return new ZProfilePageComponent();
  }

  it('should create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
