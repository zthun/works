/* eslint-disable require-jsdoc */
import { IZProfile, ZProfileBuilder, ZUserBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { Request } from 'express';
import { ZSecurityController } from './security.controller';
import { ZSecurityService } from './security.service';

describe('ZSecurityController', () => {
  let gambit: IZProfile;
  let jwt: jest.Mocked<ZSecurityService>;
  let req: jest.Mocked<Request>;

  function createTestTarget() {
    return new ZSecurityController(jwt);
  }

  beforeEach(() => {
    gambit = new ZProfileBuilder().email('gambit@marvel.com').active().build();

    req = createMocked<Request>();

    jwt = createMocked<ZSecurityService>(['extract']);
    jwt.extract.mockReturnValue(Promise.resolve(new ZUserBuilder().email('gambit@marvel.com').super().active().build()));
  });

  describe('Identity', () => {
    it('returns the individual profile from the token.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read(req);
      // Assert
      expect(actual).toEqual(gambit);
    });
  });
});
