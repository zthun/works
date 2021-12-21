/* eslint-disable require-jsdoc */
import { ZConfigEntryBuilder } from '@zthun/works.core';
import { ZVaultMemoryClient } from './vault-memory.client';

describe('ZVaultMemoryClient', () => {
  function createTestTarget() {
    return new ZVaultMemoryClient();
  }

  it('should return the previously set value.', async () => {
    // Arrange
    const target = createTestTarget();
    const entry = new ZConfigEntryBuilder().scope('identity').key('secret').value('abcdefg').build();
    const request = new ZConfigEntryBuilder().copy(entry).generate().build();
    await target.put(entry);
    // Act
    const actual = await target.get(request);
    // Assert
    expect(actual).toEqual(entry);
  });

  it('should add the default value if no value exists.', async () => {
    // Arrange
    const target = createTestTarget();
    const request = new ZConfigEntryBuilder().scope('identity').key('secret').generate().build();
    // Act
    const actual = await target.get(request);
    // Assert
    expect(actual).toEqual(request);
  });

  it('should overwrite the value on a put.', async () => {
    // Arrange
    const target = createTestTarget();
    const entry = new ZConfigEntryBuilder().scope('identity').key('secret').value('abcdefg').build();
    const request = new ZConfigEntryBuilder().copy(entry).generate().build();
    // Act
    await target.put(entry);
    await target.put(request);
    const actual = await target.get(entry);
    // Assert
    expect(actual).toEqual(request);
  });
});
