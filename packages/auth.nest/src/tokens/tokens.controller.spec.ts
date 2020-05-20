import { createSpyObj } from 'jest-createspyobj';
import { ZJwtService } from './jwt.service';
import { ZTokensController } from './tokens.controller';

describe('TokensController', () => {
  let domain: string;
  let jwt: jest.Mocked<ZJwtService>;

  function createTestTarget() {
    return new ZTokensController(jwt);
  }

  beforeEach(() => {
    jwt = createSpyObj(ZJwtService, ['inject', 'extract', 'sign', 'verify', 'clear']);
    domain = 'zthunworks.com';
  });

  it('can create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
