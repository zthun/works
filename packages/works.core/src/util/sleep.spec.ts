import { sleep } from './sleep';

describe('Sleep', () => {
  it('should resolve almost immediately.', async () => {
    await expect(sleep()).resolves.toBeUndefined();
  });

  it('should resolve after some time.', async () => {
    await expect(sleep(10)).resolves.toBeUndefined();
  });
});
