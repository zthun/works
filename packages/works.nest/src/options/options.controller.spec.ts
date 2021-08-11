/* eslint-disable require-jsdoc */

import { ZOptionsController } from './options.controller';
import { Request } from 'express';
import { createMocked } from '@zthun/works.jest';

describe('ZOptionsController', () => {
  let request: Request;

  function createTestTarget() {
    return new ZOptionsController();
  }

  function createRoute(path: string, methods: string[]) {
    return {
      path,
      stack: methods.map((method) => ({ method }))
    };
  }

  beforeEach(() => {
    request = createMocked();
    request.app = createMocked();
    request.app._router = {
      stack: [
        {
          name: 'bounded-request',
          route: createRoute('/api/users', ['get', 'put'])
        },
        {
          name: 'whatever'
        },
        {
          name: 'bounded-request',
          route: createRoute('/api/users', ['post'])
        },
        {
          name: 'bounded-request',
          route: createRoute('/api/animals', ['delete', 'patch'])
        },
        {
          name: 'something-else'
        },
        {
          name: 'unbounded-request',
          route: createRoute('/api/monkeys', [])
        }
      ]
    };
  });

  it('returns all the options from the main nest application.', async () => {
    // Arrange
    const target = createTestTarget();
    const expected = [
      { path: '/api/users', method: 'get' },
      { path: '/api/users', method: 'put' },
      { path: '/api/users', method: 'post' },
      { path: '/api/animals', method: 'delete' },
      { path: '/api/animals', method: 'patch' }
    ];
    // Act
    const actual = await target.read(request);
    // Assert
    expect(actual).toEqual(expected);
  });
});
