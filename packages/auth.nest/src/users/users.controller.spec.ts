import { IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/auth.core';
import { plainToClass } from 'class-transformer';
import { createSpyObj } from 'jest-createspyobj';
import { find } from 'lodash';
import { ZUserCreateDto } from './user-create.dto';
import { ZUserUpdateDto } from './user-update.dto';
import { ZUsersController } from './users.controller';
import { ZUsersService } from './users.service';

describe('ZUsersController', () => {
  let gambit: IZUser;
  let iceman: IZUser;
  let wolverine: IZUser;
  let xmen: IZUser[];
  let users: jest.Mocked<ZUsersService>;

  function createTestTarget() {
    return new ZUsersController(users);
  }

  beforeEach(() => {
    gambit = new ZUserBuilder().email('gambit@marvel.com').password('not-very-secret').super().id('3').build();
    iceman = new ZUserBuilder().email('iceman@marvel.com').password('not-secure-either').id('2').build();
    wolverine = new ZUserBuilder().email('wolverine@marvel.com').password('thi$-one-is-a-little-better').id('0').build();

    xmen = [gambit, iceman, wolverine];

    users = createSpyObj(ZUsersService, ['findById', 'list', 'update', 'create', 'remove', 'findByEmail']);
    users.findByEmail.mockImplementation((email) => Promise.resolve(find(xmen, (x) => x.email === email)));
    users.findById.mockImplementation((id) => Promise.resolve(find(xmen, (x) => x._id === id)));
    users.update.mockImplementation((id) => Promise.resolve(find(xmen, (x) => x._id === id)));
    users.create.mockImplementation((login) => Promise.resolve(new ZUserBuilder().email(login.email).password(login.password).build()));
    users.list.mockReturnValue(Promise.resolve(xmen));
    users.remove.mockImplementation((id) => Promise.resolve(find(xmen, (x) => x._id === id)));
  });

  describe('Create, read, update, delete', () => {
    it('returns all users redacted.', async () => {
      // Arrange
      const target = createTestTarget();
      const xmenr = xmen.map((x) => new ZUserBuilder().copy(x).redact().build());
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(xmenr);
    });

    it('returns the individual user.', async () => {
      // Arrange
      const target = createTestTarget();
      const gambitr = new ZUserBuilder().copy(gambit).redact().build();
      // Act
      const actual = await target.read({ id: gambit._id });
      // Assert
      expect(actual).toEqual(gambitr);
    });

    it('returns the created user redacted.', async () => {
      // Arrange
      const target = createTestTarget();
      const psylocke = new ZLoginBuilder().email('psylocke@marvel.com').password('whatever').autoConfirm().build();
      const dto = plainToClass(ZUserCreateDto, psylocke);
      const expected = new ZUserBuilder().email(psylocke.email).build();
      // Act
      const actual = await target.create(dto);
      // Assert
      expect(actual).toEqual(expected);
    });

    it('returns the updated user redacted.', async () => {
      // Arrange
      const target = createTestTarget();
      const login = new ZLoginBuilder().email(wolverine.email).password(wolverine.password).autoConfirm().build();
      const dto = plainToClass(ZUserUpdateDto, login);
      const expected = new ZUserBuilder().copy(wolverine).redact().build();
      // Act
      const actual = await target.update({ id: wolverine._id }, login);
      // Assert
      expect(actual).toEqual(expected);
    });

    it('returns the removed user redacted.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = new ZUserBuilder().copy(wolverine).redact().build();
      // Act
      const actual = await target.remove({ id: wolverine._id });
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
