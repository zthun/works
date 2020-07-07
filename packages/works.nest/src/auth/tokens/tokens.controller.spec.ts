import { IZLogin, ZLoginBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { Response } from 'express';
import { ZTokensController } from './tokens.controller';
import { ZTokensService } from './tokens.service';

describe('TokensController', () => {
  let credentials: IZLogin;
  let res: jest.Mocked<Response>;
  let jwt: jest.Mocked<ZTokensService>;

  function createTestTarget() {
    return new ZTokensController(jwt);
  }

  beforeEach(() => {
    jwt = createMocked(['inject', 'clear']);
    jwt.inject.mockReturnValue(Promise.resolve());
    jwt.clear.mockReturnValue(Promise.resolve());

    credentials = new ZLoginBuilder().email('gambit@marvel.com').password('sure').autoConfirm().build();

    res = createMocked(['sendStatus']);
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
