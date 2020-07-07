import { IZProfile, ZLoginBuilder, ZProfileActivationBuilder, ZProfileBuilder, ZUserBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { v4 } from 'uuid';
import { ZTokensService } from '../tokens/tokens.service';
import { ZProfileActivationUpdateDto } from './profile-activation-update.dto';
import { ZProfileCreateDto } from './profile-create.dto';
import { ZProfilesController } from './profiles.controller';
import { ZProfilesService } from './profiles.service';
import { ZProfileActivationCreateDto } from './profile-activation-create.dto';

describe('ZProfilesController', () => {
  let gambit: IZProfile;
  let jwt: jest.Mocked<ZTokensService>;
  let profile: jest.Mocked<ZProfilesService>;
  let req: jest.Mocked<Request>;

  function createTestTarget() {
    return new ZProfilesController(jwt, profile);
  }

  beforeEach(() => {
    gambit = new ZProfileBuilder().email('gambit@marvel.com').super().active().build();

    req = createMocked<Request>();

    profile = createMocked<ZProfilesService>(['update', 'create', 'remove', 'activate', 'deactivate', 'reactivate']);
    profile.update.mockResolvedValue(gambit);
    profile.remove.mockResolvedValue(gambit);
    profile.create.mockResolvedValue(gambit);
    profile.activate.mockResolvedValue(gambit);
    profile.deactivate.mockResolvedValue(gambit);
    profile.reactivate.mockResolvedValue(gambit);

    jwt = createMocked<ZTokensService>(['extract']);
    jwt.extract.mockReturnValue(Promise.resolve(new ZUserBuilder().email('gambit@marvel.com').super().active().build()));
  });

  describe('CRUD', () => {
    it('returns the individual profile from the token.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read(req);
      // Assert
      expect(actual).toEqual(gambit);
    });

    it('returns the updated profile.', async () => {
      // Arrange
      const target = createTestTarget();
      const login = new ZLoginBuilder().email(gambit.email).password(gambit.password).autoConfirm().build();
      // Act
      const actual = await target.update(req, login);
      // Assert
      expect(actual).toEqual(gambit);
    });

    it('returns the created profile.', async () => {
      // Arrange
      const target = createTestTarget();
      const login = new ZLoginBuilder().email(gambit.email).password(gambit.password).autoConfirm().build();
      const dto = plainToClass(ZProfileCreateDto, login);
      // Act
      const actual = await target.create(dto);
      // Assert
      expect(actual).toEqual(gambit);
    });

    it('returns the removed profile.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.remove(req);
      // Assert
      expect(actual).toEqual(gambit);
    });
  });

  describe('Activation', () => {
    it('activates user.', () => {
      // Arrange
      const target = createTestTarget();
      const activate = new ZProfileActivationBuilder().email(gambit.email).key(v4()).build();
      const dto = plainToClass(ZProfileActivationUpdateDto, activate);
      // Act
      target.updateActivation(dto);
      // Assert
      expect(profile.activate).toHaveBeenCalledWith(gambit.email);
    });

    it('reactivates user.', () => {
      // Arrange
      const target = createTestTarget();
      const activate = new ZProfileActivationBuilder().email(gambit.email).key(null).build();
      const dto = plainToClass(ZProfileActivationCreateDto, activate);
      // Act
      target.createActivation(dto);
      // Assert
      expect(profile.reactivate).toHaveBeenCalledWith(gambit.email);
    });
  });
});
