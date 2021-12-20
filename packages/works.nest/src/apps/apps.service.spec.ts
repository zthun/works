/* eslint-disable require-jsdoc */
import { IZConfigEntry, ZConfigEntryBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZWorksConfigService } from '../config/works-config.service';
import { ZAppsService } from './apps.service';

describe('ZAppsService', () => {
  let domain: IZConfigEntry;
  let config: jest.Mocked<ZWorksConfigService>;

  function createTestTarget() {
    return new ZAppsService(config);
  }

  beforeEach(() => {
    domain = new ZConfigEntryBuilder().scope('common').key('domain').value('zthunworks.com').build();
    config = createMocked<ZWorksConfigService>(['domain']);
    config.domain.mockResolvedValue(domain);
  });

  it('should return all applications.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.listWebApps();
    // Assert
    expect(actual).toBeTruthy();
  });
});
