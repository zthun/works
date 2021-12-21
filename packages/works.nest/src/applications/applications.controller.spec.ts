/* eslint-disable require-jsdoc */
import { IZConfigEntry, IZWebApp, ZConfigEntryBuilder, ZWebAppBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZAppsClient, ZVaultClient, ZVaultMemoryClient } from '@zthun/works.microservices';
import { ZApplicationsController } from './applications.controller';

describe('ZApplicationsController', () => {
  let apps: IZWebApp[];
  let service: jest.Mocked<ZAppsClient>;
  let domain: IZConfigEntry<string>;
  let config: ZVaultClient;

  function createTestTarget() {
    return new ZApplicationsController(service, config);
  }

  beforeEach(() => {
    apps = [new ZWebAppBuilder().id('one').name('One').build(), new ZWebAppBuilder().id('two').name('Two').build()];

    service = createMocked(['listWebApps']);
    service.listWebApps.mockResolvedValue(apps);

    domain = new ZConfigEntryBuilder<string>().scope('common').key('domain').value('zthunworks.com').build();
    config = new ZVaultMemoryClient();
    config.put(domain);
  });

  describe('Web Apps', () => {
    it('should return all apps.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = apps.map((app) => new ZWebAppBuilder().copy(app).domain(`https://${app._id}.${domain.value}`).build());
      // Act
      const actual = await target.listWebApps();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
