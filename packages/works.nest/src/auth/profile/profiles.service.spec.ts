import { createMocked } from '@zthun/works.jest';
import { ZEmailService } from '../../notifications/email.service';
import { ZUsersService } from '../../users/users.service';
import { ZVaultService } from '../../vault/vault.service';
import { ZProfilesService } from './profiles.service';

describe('ZProfilesService', () => {
  let users: jest.Mocked<ZUsersService>;
  let email: jest.Mocked<ZEmailService>;
  let vault: jest.Mocked<ZVaultService>;

  function createTestTarget() {
    return new ZProfilesService(users, email, vault);
  }

  beforeEach(() => {
    users = createMocked<ZUsersService>();
    email = createMocked<ZEmailService>();
    vault = createMocked<ZVaultService>();
  });

  it('can create.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
