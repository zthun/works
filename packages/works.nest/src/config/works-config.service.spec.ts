/* eslint-disable require-jsdoc */
import { IZConfigEntry, ZConfigEntryBuilder, ZServerBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZVaultClient } from '@zthun/works.microservices';
import { ZWorksConfigService } from './works-config.service';

describe('ZWorksConfigService', () => {
  let vault: jest.Mocked<ZVaultClient>;

  async function createTestTarget() {
    const target = new ZWorksConfigService(vault);
    await target.onModuleInit();
    return target;
  }

  beforeEach(() => {
    vault = createMocked(['get']);
  });

  async function assertInitializesValue<T>(scope: string, key: string, value: T) {
    // Arrange
    const expected = new ZConfigEntryBuilder<T>().scope(scope).key(key).value(value).build();
    vault.get.mockImplementationOnce((entry) => Promise.resolve(entry));
    // Act
    await createTestTarget();
    // Assert
    expect(vault.get).toHaveBeenCalledWith(expect.objectContaining(expected));
  }

  async function assertGeneratesValue(scope: string, key: string) {
    // Arrange
    const expected = new ZConfigEntryBuilder<string>().scope(scope).key(key).build();
    delete expected.value;
    vault.get.mockImplementationOnce((entry) => Promise.resolve(new ZConfigEntryBuilder().copy(entry).generate().build()));
    // Act
    await createTestTarget();
    // Assert
    expect(vault.get).toHaveBeenCalledWith(expect.objectContaining(expected));
  }

  async function assertReturnsValue<T>(scope: string, key: string, value: T, getFn: (t: ZWorksConfigService) => Promise<IZConfigEntry<T>>) {
    // Arrange
    const expected = new ZConfigEntryBuilder().scope(scope).key(key).value(value).build();
    vault.get.mockImplementation(() => Promise.resolve(expected));
    const target = await createTestTarget();
    // Act
    const actual = await getFn(target);
    // Assert
    expect(actual.value).toEqual(value);
  }

  describe('Common', () => {
    it('initializes the domain', async () => {
      await assertInitializesValue(ZWorksConfigService.SCOPE_COMMON, ZWorksConfigService.KEY_COMMON_DOMAIN, ZWorksConfigService.VALUE_COMMON_DOMAIN);
    });

    it('returns the domain.', async () => {
      await assertReturnsValue(ZWorksConfigService.SCOPE_COMMON, ZWorksConfigService.KEY_COMMON_DOMAIN, 'my-domain.com', (t) => t.domain());
    });
  });

  describe('Notifications', () => {
    it('initializes the default smtp', async () => {
      await assertInitializesValue(ZWorksConfigService.SCOPE_NOTIFICATIONS, ZWorksConfigService.KEY_NOTIFICATIONS_SMTP, ZWorksConfigService.VALUE_NOTIFICATIONS_SMTP);
    });

    it('returns the smtp server.', async () => {
      const expected = new ZServerBuilder().address('smtp.some-domain.com').port(587).username('batman').password('this-password-sucks').build();
      await assertReturnsValue(ZWorksConfigService.SCOPE_NOTIFICATIONS, ZWorksConfigService.KEY_NOTIFICATIONS_SMTP, expected, (t) => t.smtp());
    });

    it('initializes the notifier', async () => {
      await assertInitializesValue(ZWorksConfigService.SCOPE_NOTIFICATIONS, ZWorksConfigService.KEY_NOTIFICATIONS_NOTIFIER, ZWorksConfigService.VALUE_NOTIFICATIONS_NOTIFIER);
    });

    it('returns the domain.', async () => {
      await assertReturnsValue(ZWorksConfigService.SCOPE_NOTIFICATIONS, ZWorksConfigService.KEY_NOTIFICATIONS_NOTIFIER, 'other@some-domain.com', (t) => t.notifier());
    });
  });

  describe('Cookies', () => {
    it('initializes the secret', async () => {
      await assertGeneratesValue(ZWorksConfigService.SCOPE_COOKIES, ZWorksConfigService.KEY_COOKIES_SECRET);
    });

    it('returns the secret.', async () => {
      await assertReturnsValue(ZWorksConfigService.SCOPE_COOKIES, ZWorksConfigService.KEY_COOKIES_SECRET, 'abcdefg', (t) => t.secret());
    });
  });
});
