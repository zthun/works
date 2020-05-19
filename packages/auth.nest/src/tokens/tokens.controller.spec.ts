import { createSpyObj } from 'jest-createspyobj';
import { ZUsersService } from '../users/users.service';
import { ZJwtService } from './jwt.service';
import { ZTokensController } from './tokens.controller';

describe('TokensController', () => {
  let domain: string;
  let jwt: jest.Mocked<ZJwtService>;
  let users: jest.Mocked<ZUsersService>;

  function createTestTarget() {
    return new ZTokensController(users, jwt);
  }

  beforeEach(() => {
    jwt = createSpyObj(ZJwtService, ['inject', 'extract', 'sign', 'verify', 'clear']);
    users = createSpyObj(ZUsersService, ['findByEmail', 'findById']);
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
