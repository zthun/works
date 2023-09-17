import { IZConfigEntry, IZVaultClient, ZConfigEntryBuilder, ZVaultClientMemory } from '@zthun/vault-client';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { ZAppsClient } from '@zthun/works.microservices';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZApplicationsController } from './applications.controller';

describe('ZApplicationsController', () => {
  let apps: IZWebApp[];
  let service: Mocked<ZAppsClient>;
  let domain: IZConfigEntry<string>;
  let config: IZVaultClient;

  function createTestTarget() {
    return new ZApplicationsController(service, config);
  }

  beforeEach(() => {
    apps = [new ZWebAppBuilder().id('one').name('One').build(), new ZWebAppBuilder().id('two').name('Two').build()];

    service = mock<ZAppsClient>();
    service.listWebApps.mockResolvedValue(apps);

    domain = new ZConfigEntryBuilder<string>('zthunworks.com').scope('common').key('domain').build();
    config = new ZVaultClientMemory();
    config.put(domain);
  });

  describe('Web Apps', () => {
    it('should return all apps.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = apps.map((app) =>
        new ZWebAppBuilder().copy(app).domain(`https://${app._id}.${domain.value}`).build()
      );
      // Act
      const actual = await target.listWebApps();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
