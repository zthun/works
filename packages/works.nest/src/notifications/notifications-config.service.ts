import { Injectable, OnModuleInit } from '@nestjs/common';
import { IZConfigEntry, IZServer, ZConfigEntryBuilder, ZServerBuilder } from '@zthun/works.core';
import { ZCommonConfigService } from '../vault/common-config.service';
import { ZVaultService } from '../vault/vault.service';

/**
 * Represents a service for common configuration throughout the system.
 */
@Injectable()
export class ZNotificationsConfigService implements OnModuleInit {
  /**
   * The scope for the common config.
   */
  public static readonly SCOPE = 'notifications';

  /**
   * The key for the smtp config.
   */
  public static readonly KEY_SMTP = 'smtp';

  /**
   * The key for the notifier config.
   */
  public static readonly KEY_NOTIFIER = 'notifier';

  /**
   * The default value for the smtp config.
   */
  public static readonly DEFAULT_SMTP = new ZServerBuilder().address(`smtp.${ZCommonConfigService.DEFAULT_DOMAIN}`).build();

  /**
   * The default value for the notifier config.
   */
  public static readonly DEFAULT_NOTIFIER = `notifications@${ZCommonConfigService.DEFAULT_DOMAIN}`;

  /**
   * Initializes a new instance of this object.
   *
   * @param _vault The service for reading and writing to the vault.
   */
  public constructor(private readonly _vault: ZVaultService) {}

  /**
   * Initializes this service.
   *
   * @returns A promise that, when resolved, has initialized all configurations.
   */
  public async onModuleInit(): Promise<any> {
    return Promise.all([this.smtp(), this.notifier()]);
  }

  /**
   * Gets the smtp server to use when sending email notifications.
   *
   * @returns A promise that, when resolved, has returned the smtp server for sending emails.
   */
  public async smtp(): Promise<IZConfigEntry<IZServer>> {
    const config = new ZConfigEntryBuilder<IZServer>().scope(ZNotificationsConfigService.SCOPE).key(ZNotificationsConfigService.KEY_SMTP).value(ZNotificationsConfigService.DEFAULT_SMTP).build();
    return this._vault.get<IZServer>(config);
  }

  /**
   * Gets the notifier for automatic notifications for emails.
   *
   * @returns A promise that, when resolved, has returned the email notifier.
   */
  public async notifier(): Promise<IZConfigEntry<string>> {
    const config = new ZConfigEntryBuilder<string>().scope(ZNotificationsConfigService.SCOPE).key(ZNotificationsConfigService.KEY_NOTIFIER).value(ZNotificationsConfigService.DEFAULT_NOTIFIER).build();
    return this._vault.get<string>(config);
  }
}
