/* eslint-disable require-jsdoc */
import { ZConfigEntryBuilder, ZServerBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZVaultClient } from '@zthun/works.microservices';
import { ZNotificationsConfigService } from './notifications-config.service';

describe('ZNotificationsConfigService', () => {
  let vault: jest.Mocked<ZVaultClient>;

  async function createTestTarget() {
    const target = new ZNotificationsConfigService(vault);
    await target.onModuleInit();
    return target;
  }

  beforeEach(() => {
    vault = createMocked(['get']);
  });

  describe('Smtp', () => {
    it('initializes the default smtp', async () => {
      // Arrange
      const expected = new ZConfigEntryBuilder().scope(ZNotificationsConfigService.SCOPE).key(ZNotificationsConfigService.KEY_SMTP).value(ZNotificationsConfigService.DEFAULT_SMTP).build();
      vault.get.mockImplementationOnce((entry) => Promise.resolve(entry));
      // Act
      await createTestTarget();
      // Assert
      expect(vault.get).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('returns the smtp server.', async () => {
      // Arrange
      const expected = new ZConfigEntryBuilder().scope(ZNotificationsConfigService.SCOPE).key(ZNotificationsConfigService.KEY_SMTP).value(new ZServerBuilder().address('smtp.server.com').build()).build();
      vault.get.mockImplementation(() => Promise.resolve(expected));
      const target = await createTestTarget();
      // Act
      const actual = await target.smtp();
      // Assert
      expect(actual.value).toEqual(expected.value);
    });
  });

  describe('Notifier', () => {
    it('initializes the notifier', async () => {
      // Arrange
      const expected = new ZConfigEntryBuilder().scope(ZNotificationsConfigService.SCOPE).key(ZNotificationsConfigService.KEY_NOTIFIER).value(ZNotificationsConfigService.DEFAULT_NOTIFIER).build();
      vault.get.mockImplementationOnce((entry) => Promise.resolve(entry));
      // Act
      await createTestTarget();
      // Assert
      expect(vault.get).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('returns the domain.', async () => {
      // Arrange
      const expected = new ZConfigEntryBuilder().scope(ZNotificationsConfigService.SCOPE).key(ZNotificationsConfigService.KEY_NOTIFIER).value('zthun@zthunworks.com').build();
      vault.get.mockImplementation(() => Promise.resolve(expected));
      const target = await createTestTarget();
      // Act
      const actual = await target.notifier();
      // Assert
      expect(actual.value).toEqual(expected.value);
    });
  });
});
