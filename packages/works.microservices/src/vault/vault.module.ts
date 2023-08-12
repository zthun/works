/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { sleep } from '@zthun/helpful-fn';
import { ZLogEntryBuilder, ZLoggerConsole } from '@zthun/works.logger';
import { ZVaultClient } from './vault.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Vault.Service',
        transport: Transport.TCP,
        options: {
          host: 'zthunworks-services-vault',
          port: 4000
        }
      }
    ])
  ],
  providers: [ZVaultClient],
  exports: [ZVaultClient]
})
/**
 * Represents the module that handles users.
 */
export class ZVaultModule {
  private _logger = new ZLoggerConsole(console);

  /**
   * Initializes a new instance of this object.
   *
   * @param _vault
   *        The vault client.
   */
  public constructor(private _vault: ZVaultClient) {}

  /**
   * Occurs when the module is initialized.
   */
  public async onModuleInit() {
    const timeout = 120000;
    const interval = 3000;
    let lastError: any = null;
    this._logger.log(new ZLogEntryBuilder().message('Waiting for the vault service to be ready').info().build());

    for (let i = 0; i < timeout; i += interval) {
      try {
        await this._vault.health();
        i = timeout;
        lastError = null;
        this._logger.log(new ZLogEntryBuilder().message('Vault service is ready').info().build());
      } catch (e) {
        this._logger.log(new ZLogEntryBuilder().message('Vault not yet ready.  Retrying...').warning().build());
        lastError = e;
        await sleep(interval);
      }
    }

    if (lastError) {
      this._logger.log(new ZLogEntryBuilder().message('Vault service failed to initialize').catastrophe().build());
      this._logger.log(new ZLogEntryBuilder().message(JSON.stringify(lastError)).error().build());
    }
  }
}
