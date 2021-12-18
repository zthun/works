import { ClientProxy } from '@nestjs/microservices';
import { ZUsersClient } from './users.client';
import { createMocked } from '@zthun/works.jest';
import { of } from 'rxjs';
import { v4 } from 'uuid';

/* eslint-disable require-jsdoc */
describe('UsersClient', () => {
  let proxy: jest.Mocked<ClientProxy>;

  function createTestTarget() {
    return new ZUsersClient(proxy);
  }

  beforeEach(() => {
    proxy = createMocked(['send']);
    proxy.send.mockReturnValue(of(null));
  });

  function assertSendsMessage<T>(cmd: string, payload: T, sendFn: (t: ZUsersClient, p: T) => Promise<any>) {
    // Arrange.
    const target = createTestTarget();
    // Act.
    sendFn(target, payload);
    // Assert.
    expect(proxy.send).toHaveBeenCalledWith({ cmd }, payload);
  }

  describe('Find', () => {
    it('finds by id.', () => {
      assertSendsMessage('find', { _id: v4() }, (t, p) => t.findById(p._id));
    });

    it('finds by email.', () => {
      assertSendsMessage('find', { email: 'test@mail.com' }, (t, p) => t.findByEmail(p.email));
    });
  });
});
