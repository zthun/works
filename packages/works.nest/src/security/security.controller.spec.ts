/* eslint-disable require-jsdoc */
import { createMocked } from '@zthun/spellcraft-jest';
import { ZHttpCodeSuccess } from '@zthun/webigail-http';
import { IZProfile, ZProfileBuilder, ZUserBuilder } from '@zthun/works.core';
import { Request, Response } from 'express';
import { ZSecurityController } from './security.controller';
import { ZSecurityService } from './security.service';

describe('ZSecurityController', () => {
  let gambit: IZProfile;
  let jwt: jest.Mocked<ZSecurityService>;
  let req: jest.Mocked<Request>;
  let res: jest.Mocked<Response>;

  function createTestTarget() {
    return new ZSecurityController(jwt);
  }

  beforeEach(() => {
    gambit = new ZProfileBuilder().email('gambit@marvel.com').active().build();

    req = createMocked<Request>();
    res = createMocked<Response>(['status', 'send']);
    res.status.mockReturnValue(res);
    res.send.mockReturnValue(res);

    jwt = createMocked<ZSecurityService>(['extract']);
    jwt.extract.mockResolvedValue(new ZUserBuilder().email('gambit@marvel.com').super().active().build());
  });

  describe('Identity', () => {
    it('returns the individual profile from the token.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read(req, res);
      // Assert
      expect(actual).toEqual(gambit);
    });

    it('sets the response to a no content status if no user exists.', async () => {
      // Arrange
      jwt.extract.mockResolvedValue(null);
      const target = createTestTarget();
      // Act
      await target.read(req, res);
      // Assert
      expect(res.status).toHaveBeenCalledWith(ZHttpCodeSuccess.NoContent);
    });

    it('returns null if no such user exists.', async () => {
      // Arrange
      jwt.extract.mockResolvedValue(null);
      const target = createTestTarget();
      // Act
      const actual = await target.read(req, res);
      // Assert
      expect(actual).toBeNull();
    });
  });
});
