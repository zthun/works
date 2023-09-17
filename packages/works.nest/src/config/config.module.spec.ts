import { IZConfigEntry, IZVaultClient } from '@zthun/vault-client';
import { flatten } from 'lodash';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZConfigEntries, ZConfigModule } from './config.module';

describe('ZConfigModule', () => {
  let vault: Mocked<IZVaultClient>;

  async function createTestTarget() {
    const target = new ZConfigModule(vault);
    await target.onModuleInit();
    return target;
  }

  beforeEach(() => {
    vault = mock<IZVaultClient>();
  });

  it('should initialize all of the entries in ZConfigEntries.', async () => {
    // Arrange
    const expected: IZConfigEntry<any>[] = flatten(
      Object.keys(ZConfigEntries).map((scope) => Object.values<IZConfigEntry<any>>(ZConfigEntries[scope]))
    );
    // Act
    await createTestTarget();
    // Assert
    expect(vault.get).toHaveBeenCalledTimes(expected.length);
    expected.forEach((entry) => expect(vault.get).toHaveBeenCalledWith(entry));
  });
});
