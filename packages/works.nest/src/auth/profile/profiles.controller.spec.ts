import { IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/works.core';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { ZUsersService } from '../../users/users.service';
import { ZTokensService } from '../tokens/tokens.service';
import { ZUserCreateDto } from './profile-create.dto';
import { ZUserUpdateDto } from './profile-update.dto';
import { ZProfilesController } from './profiles.controller';

describe('ZProfilesController', () => {
  let gambit: IZUser;
  let jwt: jest.Mocked<ZTokensService>;
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
    users.create.mockResolvedValue(gambit);

    jwt = createSpyObj(ZTokensService, ['extract']);
    jwt.extract.mockReturnValue(Promise.resolve(gambit));
  });

  describe('Create, read, update, delete', () => {
    it('returns the individual profile from the token.', async () => {
      // Arrange
      const target = createTestTarget();
      const gambitr = new ZUserBuilder().copy(gambit).redact().build();
      // Act
      const actual = await target.read(req);
      // Assert
      expect(actual).toEqual(gambitr);
    });

    it('returns the updated profile redacted.', async () => {
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

    it('returns the created profile.', async () => {
      // Arrange
      const target = createTestTarget();
      const login = new ZLoginBuilder().email(gambit.email).password(gambit.password).autoConfirm().build();
      const dto = plainToClass(ZUserCreateDto, login);
      const expected = new ZUserBuilder().copy(gambit).redact().build();
      // Act
      const actual = await target.create(dto);
      // Assert
      expect(actual).toEqual(expected);
    });

    it('returns the removed profile redacted.', async () => {
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
