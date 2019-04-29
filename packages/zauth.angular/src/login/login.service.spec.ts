import { HttpClient } from '@angular/common/http';
import { ZLoginService } from './login.service';

describe('ZLoginService', () => {
  let http: HttpClient;

  function createTestTarget() {
    return new ZLoginService(http);
  }

  beforeEach(() => {
    http = {} as HttpClient;
    http.get = jest.fn();
    http.post = jest.fn();
    http.put = jest.fn();
    http.delete = jest.fn();
  });

  it('can create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
