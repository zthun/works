import { ClientProxy } from '@nestjs/microservices';
import { createSpyObj } from 'jest-createspyobj';
import { ZTokensController } from './tokens.controller';

describe('TokensController', () => {
  let domain: string;
  let users: jest.Mocked<ClientProxy>;
  let jwt: jest.Mocked<ClientProxy>;

  function createTestTarget() {
    return new ZTokensController(domain, jwt, users);
  }

  beforeEach(() => {
    jwt = createSpyObj(ClientProxy, ['send']);
    users = createSpyObj(ClientProxy, ['send']);
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
