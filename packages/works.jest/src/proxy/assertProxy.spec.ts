/* eslint-disable require-jsdoc */
import { v4 } from 'uuid';
import { assertProxySendsMessage } from './assertProxy';
import { createMocked } from '../spy/create-mocked.function';

describe('Proxy', () => {
  let proxy: jest.Mocked<{ send: (pattern: any, payload: any) => any }>;

  function createTestTarget() {
    return {
      check: async (id: string) => {
        await proxy.send({ cmd: 'check' }, { id });
      }
    };
  }

  beforeEach(() => {
    proxy = createMocked(['send']);
    proxy.send.mockResolvedValue(true);
  });

  describe('assertProxySendsMessage', () => {
    it('should pass if the send method is called with the given arguments.', () => {
      assertProxySendsMessage({ cmd: 'check' }, { id: v4() }, proxy, createTestTarget, (t, p) => t.check(p.id));
    });
  });
});
