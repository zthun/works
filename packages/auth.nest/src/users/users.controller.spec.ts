import { ClientProxy } from '@nestjs/microservices';
import { createSpyObj } from 'jest-createspyobj';
import { ZUsersController } from './users.controller';

describe('ZUsersController', () => {
  let users: jest.Mocked<ClientProxy>;

  function createTestTarget() {
    return new ZUsersController(users);
  }

  beforeEach(() => {
    users = createSpyObj(ClientProxy, ['send']);
  });

  it('can create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
