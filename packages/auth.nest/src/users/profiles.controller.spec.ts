import { IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/auth.core';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { ZJwtService } from '../tokens/jwt.service';
import { ZProfilesController } from './profiles.controller';
import { ZUserUpdateDto } from './user-update.dto';
import { ZUsersService } from './users.service';

describe('ZProfilesController', () => {
  let gambit: IZUser;
  let jwt: jest.Mocked<ZJwtService>;
  let users: jest.Mocked<ZUsersService>;
  let req: jest.Mocked<Request>;

  function createTestTarget() {
    return new ZProfilesController(jwt, users);
  }

  beforeEach(() => {
    gambit = new ZUserBuilder().email('gambit@marvel.com').password('not-very-secret').super().id('3').build();

    req = (createSpyObj('req', ['text']) as unknown) as jest.Mocked<Request>;

    users = createSpyObj(ZUsersService, ['findById', 'list', 'update', 'create', 'remove', 'findByEmail']);
    users.update.mockResolvedValue(gambit);
    users.remove.mockResolvedValue(gambit);

    jwt = createSpyObj(ZJwtService, ['extract']);
    jwt.extract.mockReturnValue(Promise.resolve(gambit));
  });

  describe('Create, read, update, delete', () => {
    it('returns the individual user from the token.', async () => {
      // Arrange
      const target = createTestTarget();
      const gambitr = new ZUserBuilder().copy(gambit).redact().build();
      // Act
      const actual = await target.read(req);
      // Assert
      expect(actual).toEqual(gambitr);
    });

    it('returns the updated user redacted.', async () => {
      // Arrange
      const target = createTestTarget();
      const login = new ZLoginBuilder().email(gambit.email).password(gambit.password).autoConfirm().build();
      const dto = plainToClass(ZUserUpdateDto, login);
      const expected = new ZUserBuilder().copy(gambit).redact().build();
      // Act
      const actual = await target.update(req, login);
      // Assert
      expect(actual).toEqual(expected);
    });

    it('returns the removed user redacted.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = new ZUserBuilder().copy(gambit).redact().build();
      // Act
      const actual = await target.remove(req);
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
