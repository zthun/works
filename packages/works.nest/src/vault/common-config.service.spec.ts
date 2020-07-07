import { ZConfigEntryBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZCommonConfigService } from './common-config.service';
import { ZVaultService } from './vault.service';

describe('ZCommonConfigService', () => {
  let vault: jest.Mocked<ZVaultService>;

  async function createTestTarget() {
    const target = new ZCommonConfigService(vault);
    await target.onModuleInit();
    return target;
  }

  beforeEach(() => {
    vault = createMocked(['get']);
  });

  describe('Domain', () => {
    it('initializes the domain', async () => {
      // Arrange
      const expected = new ZConfigEntryBuilder().scope(ZCommonConfigService.SCOPE).key(ZCommonConfigService.KEY_DOMAIN).value(ZCommonConfigService.DEFAULT_DOMAIN).build();
      vault.get.mockImplementationOnce((entry) => Promise.resolve(entry));
      // Act
      await createTestTarget();
      // Assert
      expect(vault.get).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('returns the domain.', async () => {
      // Arrange
      const expected = new ZConfigEntryBuilder().scope(ZCommonConfigService.SCOPE).key(ZCommonConfigService.KEY_DOMAIN).value('my-configured-domain').build();
      vault.get.mockImplementation(() => Promise.resolve(expected));
      const target = await createTestTarget();
      // Act
      const actual = await target.domain();
      // Assert
      expect(actual.value).toEqual(expected.value);
    });
  });
});
