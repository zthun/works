import { createSpyObj } from 'jest-createspyobj';
import { ZAuthModule } from './auth.module';
import { ZAuthService } from './auth.service';

describe('ZAuthModule', () => {
  let auth: jest.Mocked<ZAuthService>;

  async function createTestTarget() {
    const target = new ZAuthModule(auth);
    await target.onModuleInit();
    return target;
  }

  beforeEach(() => {
    auth = createSpyObj(ZAuthModule, ['setupSystemPermissions', 'setupSystemGroups', 'setupDefaultGroupPermissions', 'setupDefaultGroupUsers']) as unknown as jest.Mocked<ZAuthService>;
    auth.setupSystemGroups.mockResolvedValue(null);
    auth.setupSystemPermissions.mockResolvedValue(null);
  });

  it('sets up the system permissions.', async () => {
    // Arrange
    // Act
    await createTestTarget();
    // Assert
    expect(auth.setupSystemPermissions).toHaveBeenCalledTimes(1);
  });

  it('sets up the system groups.', async () => {
    // Arrange
    // Act
    await createTestTarget();
    // Assert
    expect(auth.setupSystemGroups).toHaveBeenCalledTimes(1);
  });

  it('sets up the default groups permissions.', async () => {
    // Arrange
    // Act
    await createTestTarget();
    // Assert
    expect(auth.setupDefaultGroupPermissions).toHaveBeenCalledTimes(1);
  });

  it('sets up the default group users.', async () => {
    // Arrange
    // Act
    await createTestTarget();
    // Assert
    expect(auth.setupDefaultGroupUsers).toHaveBeenCalled();
  });
});
