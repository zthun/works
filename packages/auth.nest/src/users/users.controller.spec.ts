import { createSpyObj } from 'jest-createspyobj';
import { ZUsersController } from './users.controller';
import { ZUsersService } from './users.service';

describe('ZUsersController', () => {
  let users: jest.Mocked<ZUsersService>;

  function createTestTarget() {
    return new ZUsersController(users);
  }

  beforeEach(() => {
    users = createSpyObj(ZUsersService, ['findById', 'list', 'update', 'create', 'remove', 'findByEmail']);
  });

  it('can create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
