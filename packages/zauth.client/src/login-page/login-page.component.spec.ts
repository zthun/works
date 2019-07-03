import { Router } from '@angular/router';
import { ZCreateAccountPageUrl, ZForgotPageUrl } from '../auth-app/auth-app.routes';
import { ZLoginPageComponent } from './login-page.component';

describe('ZLoginPageComponent', () => {
  let router: Router;

  function createTestTarget() {
    return new ZLoginPageComponent(router);
  }

  beforeEach(() => {
    router = {} as Router;
    router.navigate = jest.fn();
  });

  describe('Forgot', () => {
    it('routes to the page.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      target.forgot();
      // Assert
      expect(router.navigate).toHaveBeenCalledWith([ZForgotPageUrl]);
    });
  });

  describe('Create', () => {
    it('routes to the page.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      target.create();
      // Assert
      expect(router.navigate).toHaveBeenCalledWith([ZCreateAccountPageUrl]);
    });
  });
});
