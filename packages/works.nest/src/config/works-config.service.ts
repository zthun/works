import { Injectable, OnModuleInit } from '@nestjs/common';
import { ZConfigEntryBuilder, ZServerBuilder } from '@zthun/works.core';
import { ZVaultClient } from '@zthun/works.microservices';

@Injectable()
/**
 * Represents a wrapper service for the vault configuration that retrieves known configurations in the base system.
 */
export class ZWorksConfigService implements OnModuleInit {
  public static readonly SCOPE_COMMON = 'common';
  public static readonly SCOPE_NOTIFICATIONS = 'notifications';
  public static readonly SCOPE_COOKIES = 'cookies';

  public static readonly KEY_COMMON_DOMAIN = 'domain';
  public static readonly KEY_NOTIFICATIONS_SMTP = 'smtp';
  public static readonly KEY_NOTIFICATIONS_NOTIFIER = 'notifier';
  public static readonly KEY_COOKIES_SECRET = 'secret';

  public static readonly VALUE_COMMON_DOMAIN = 'zthunworks.com';
  public static readonly VALUE_NOTIFICATIONS_SMTP = new ZServerBuilder().address(`smtp.zthunworks.com`).port(25).build();
  public static readonly VALUE_NOTIFICATIONS_NOTIFIER = `notifications@zthunworks.com`;

  /**
   * Initializes a new instance of this object.
   *
   * @param _vault The service for reading and writing to the vault.
   */
  public constructor(private readonly _vault: ZVaultClient) {}

  /**
   * Initializes this service.
   *
   * @returns A promise that, when resolved, has initialized all configurations.
   */
  public async onModuleInit(): Promise<any> {
    return Promise.all([this.secret(), this.domain(), this.smtp(), this.notifier()]);
  }

  /**
   * Gets the value of a config entry.
   *
   * @param scope The entry scope.
   * @param key The key to search for.
   * @param value The default value to return if the key does not exist.
   *
   * @returns A promise that, when resolved, has returned the value for scope.key.
   */
  private _getValue<T>(scope: string, key: string, value: T) {
    const config = new ZConfigEntryBuilder<T>().scope(scope).key(key).value(value).build();
    return this._vault.get<T>(config);
  }

  /**
   * Gets a value that gets generated.
   *
   * @param scope The entry scope
   * @param key The key to search for.
   *
   * @returns A promise that, when resolved, has return the value for the scope.key.  If no
   *          such value exists, then one is generated and that is returned.
   */
  private _getGeneratedValue(scope: string, key: string) {
    const config = new ZConfigEntryBuilder<string>().scope(scope).key(key).generate().build();
    return this._vault.get<string>(config);
  }

  /**
   * Gets the current domain that the site lives on.
   *
   * @returns A promise that, when resolved, has returned the core domain for the application.
   */
  public domain = this._getValue.bind(this, ZWorksConfigService.SCOPE_COMMON, ZWorksConfigService.KEY_COMMON_DOMAIN, ZWorksConfigService.VALUE_COMMON_DOMAIN);

  /**
   * Gets the smtp server to use when sending email notifications.
   *
   * @returns A promise that, when resolved, has returned the smtp server for sending emails.
   */
  public smtp = this._getValue.bind(this, ZWorksConfigService.SCOPE_NOTIFICATIONS, ZWorksConfigService.KEY_NOTIFICATIONS_SMTP, ZWorksConfigService.VALUE_NOTIFICATIONS_SMTP);

  /**
   * Gets the notifier for automatic notifications for emails.
   *
   * @returns A promise that, when resolved, has returned the email notifier.
   */
  public notifier = this._getValue.bind(this, ZWorksConfigService.SCOPE_NOTIFICATIONS, ZWorksConfigService.KEY_NOTIFICATIONS_NOTIFIER, ZWorksConfigService.VALUE_NOTIFICATIONS_NOTIFIER);

  /**
   * Gets the cookies secret.
   *
   * @returns A promise that, when resolved, has returned the cookie secret.
   */
  public secret = this._getGeneratedValue.bind(this, ZWorksConfigService.SCOPE_COOKIES, ZWorksConfigService.KEY_COOKIES_SECRET);
}
