/* eslint-disable require-jsdoc */
import { IZConfigEntry } from '@zthun/works.core';
import { ZVaultClient } from '@zthun/works.microservices';
import { flatten } from 'lodash';
import { createMocked } from '../../../works.jest/src/spy/create-mocked.function';
import { ZConfigEntries, ZConfigModule } from './config.module';

describe('ZConfigModule', () => {
  let vault: jest.Mocked<ZVaultClient>;

  async function createTestTarget() {
    const target = new ZConfigModule(vault);
    await target.onModuleInit();
    return target;
  }

  beforeEach(() => {
    vault = createMocked(['get']);
  });

  it('should initialize all of the entries in ZConfigEntries.', async () => {
    // Arrange
    const expected: IZConfigEntry<any>[] = flatten(Object.keys(ZConfigEntries).map((scope) => Object.values<IZConfigEntry<any>>(ZConfigEntries[scope])));
    // Act
    await createTestTarget();
    // Assert
    expect(vault.get).toHaveBeenCalledTimes(expected.length);
    expected.forEach((entry) => expect(vault.get).toHaveBeenCalledWith(entry));
  });
});
