import { Router } from '@angular/router';
import { ZLoginPageUrl } from '../auth-app/auth-app.routes';
import { ZCreatePageComponent } from './create-page.component';

describe('CreatePageComponent', () => {
  let router: Router;

  function createTestTarget() {
    return new ZCreatePageComponent(router);
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
