import { Router } from '@angular/router';
import { ZLoginPageUrl } from '../auth-app/auth-app.routes';
import { ZForgotPageComponent } from './forgot-page.component';

describe('ZForgotPageComponent', () => {
  let router: Router;

  function createTestTarget() {
    return new ZForgotPageComponent(router);
  }

  beforeEach(() => {
    router = {} as Router;
    router.navigate = jest.fn();
  });

  describe('Cancel', () => {
    it('navigates back to the login page.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      target.cancel();
      // Assert
      expect(router.navigate).toHaveBeenCalledWith([ZLoginPageUrl]);
    });
  });
});
