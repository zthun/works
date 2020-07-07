import { ZConfigEntryBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { v4 } from 'uuid';
import { ZVaultService } from '../../vault/vault.service';
import { ZAuthConfigService } from './auth-config.service';

describe('ZAuthConfigService', () => {
  let vault: jest.Mocked<ZVaultService>;

  async function createTestTarget() {
    const target = new ZAuthConfigService(vault);
    await target.onModuleInit();
    return target;
  }

  beforeEach(() => {
    vault = createMocked(['get']);
  });

  describe('JWT', () => {
    it('initializes the JWT secret.', async () => {
      // Arrange
      const expected = new ZConfigEntryBuilder().scope(ZAuthConfigService.SCOPE).key(ZAuthConfigService.KEY_JWT).value(expect.anything()).build();
      vault.get.mockImplementationOnce((entry) => Promise.resolve(entry));
      // Act
      await createTestTarget();
      // Assert
      expect(vault.get).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('returns the jwt secret.', async () => {
      // Arrange
      const expected = new ZConfigEntryBuilder().scope(ZAuthConfigService.SCOPE).key(ZAuthConfigService.KEY_JWT).value(v4()).build();
      vault.get.mockImplementation(() => Promise.resolve(expected));
      const target = await createTestTarget();
      // Act
      const actual = await target.jwt();
      // Assert
      expect(actual.value).toEqual(expected.value);
    });
  });
});
