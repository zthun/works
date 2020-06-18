import { IZLogin, ZLoginBuilder } from '@zthun/works.core';
import { Response } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { ZJwtService } from './jwt.service';
import { ZTokensController } from './tokens.controller';

describe('TokensController', () => {
  let domain: string;
  let credentials: IZLogin;
  let res: jest.Mocked<Response>;
  let jwt: jest.Mocked<ZJwtService>;

  function createTestTarget() {
    return new ZTokensController(jwt);
  }

  beforeEach(() => {
    jwt = createSpyObj(ZJwtService, ['inject', 'clear']);
    jwt.inject.mockReturnValue(Promise.resolve());
    jwt.clear.mockReturnValue(Promise.resolve());

    domain = 'zthunworks.com';

    credentials = new ZLoginBuilder().email('gambit@marvel.com').password('sure').autoConfirm().build();

    res = (createSpyObj('res', ['sendStatus']) as unknown) as jest.Mocked<Response>;
  });

  describe('Login', () => {
    it('can login', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.login(res, credentials);
      // Assert
      expect(jwt.inject).toHaveBeenCalledWith(res, credentials);
    });

    it('returns no content.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.login(res, credentials);
      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });

  describe('Logout', () => {
    it('clears the cookie.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.logout(res);
    });

    it('returns no content.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.logout(res);
      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });

  describe('Verify', () => {
    it('returns no content.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.verify(res);
      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
