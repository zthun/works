import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  IZConfigEntry,
  IZVaultClient,
  ZConfigEntryBuilder,
  ZVaultClientMemory,
  ZVaultToken
} from '@zthun/vault-client';
import { ZHttpCodeSuccess } from '@zthun/webigail-http';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZApplicationsModule } from './applications-module';

describe('ZApplicationsApi', () => {
  const endpoint = 'applications';

  let domain: IZConfigEntry<string>;
  let vault: IZVaultClient;
  let _target: INestApplication<any>;

  const createTestTarget = async () => {
    const module = await Test.createTestingModule({ imports: [ZApplicationsModule] })
      .overrideProvider(ZVaultToken)
      .useValue(vault)
      .compile();

    _target = module.createNestApplication();
    await _target.init();
    return _target;
  };

  beforeEach(() => {
    domain = new ZConfigEntryBuilder<string>('test.zthunworks.com').scope('common').key('domain').build();
    vault = new ZVaultClientMemory();
    vault.put(domain);
  });

  describe('List', () => {
    it('should return all apps.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}`);
      // Assert
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.count).toBeGreaterThan(0);
      expect(actual.body.data.length).toBeTruthy();
    });

    it('should return the specific page size', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?size=1`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data.length).toEqual(1);
    });
  });
});
