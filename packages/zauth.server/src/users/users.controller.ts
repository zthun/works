import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { IZLogin, IZUser, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { hash } from 'bcryptjs';
import { pick } from 'lodash';
import { Collections } from '../common/collections.enum';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';

/**
 * Represents a service to retrieve users.
 */
@Controller('users')
export class ZUsersController {
  public static readonly Rounds = 10;

  /**
   * Initializes a new instance of this object.
   *
   * @param _dal The data access layer.
   */
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) { }

  /**
   * Gets a list of all users.
   *
   * @return A promise that, when resolved, has returned all users.
   */
  @Get()
  public async list(): Promise<IZUser[]> {
    const users = await this._dal.read<IZUser>(Collections.Users).run();
    return users.map((user) => new ZUserBuilder().copy(user).redact().build());
  }

  /**
   * Gets a specific user.
   *
   * @param params The url params.
   *
   * @return A promise that, when resolved, has the found user.
   *
   * @throws NotFoundException If the user does not exist.
   */
  @Get(':id')
  public async read(@Param() params: { id: string }): Promise<IZUser> {
    const pid = params.id;
    const filter = { _id: pid };
    const userBlobs = await this._dal.read<IZUser>(Collections.Users).filter(filter).run();
    ZHttpAssert.assert(userBlobs.length > 0, () => new NotFoundException());

    const user = userBlobs[0];
    return new ZUserBuilder().copy(user).redact().build();
  }

  /**
   * Creates a new user.
   *
   * @param login The user to create.
   *
   * @return A promise that, when resolved, has returned the new user.
   *
   * @throws ConflictException If a user already has the same name or already exists.
   */
  @Post()
  public async create(@Body() login: IZLogin): Promise<IZUser> {
    const filter = pick(login, 'email');
    ZHttpAssert.assert(!!login.email, () => new BadRequestException('User email is required.'));
    ZHttpAssert.assert(!!login.password, () => new BadRequestException('Password is required.'));
    ZHttpAssert.assert(login.password === login.confirm, () => new BadRequestException('Passwords do not match'));

    const count = await this._dal.count(Collections.Users).filter(filter).run();
    ZHttpAssert.assert(count === 0, () => new ConflictException('User email is already taken.'));

    const total = await this._dal.count(Collections.Users).run();
    const password = await hash(login.password, ZUsersController.Rounds);
    const builder = new ZUserBuilder().email(login.email).password(password);
    const create = total === 0 ? builder.super().build() : builder.build();
    const createdBlobs = await this._dal.create(Collections.Users, [create]).run();
    const created = createdBlobs[0];
    return new ZUserBuilder().copy(created).redact().build();
  }

  /**
   * Updates an existing user.
   *
   * @param params The param that contains the id to update.
   * @param login The user template to update.
   *
   * @return A promise that, when resolved, has returned the updated user.
   *
   * @throws NotFoundException If not user exists with the given id.
   * @throws ConflictException If the name of the user changes and there is already another user with the same name.
   */
  @Put(':id')
  public async update(@Param() params: { id: string }, @Body() login: Partial<IZLogin>): Promise<IZUser> {
    const pid = params.id;

    const idFilter = { _id: pid };
    const currentBlobs = await this._dal.read<IZUser>(Collections.Users).filter(idFilter).run();
    ZHttpAssert.assert(currentBlobs.length > 0, () => new NotFoundException());

    const template: Partial<IZUser> = {};

    if (login.email) {
      const emailFilter = { email: login.email, _id: { $ne: pid } };
      const count = await this._dal.count(Collections.Users).filter(emailFilter).run();
      ZHttpAssert.assert(count === 0, () => new ConflictException('User name is already taken.'));
      template.email = login.email;
    }

    if (login.password || login.confirm) {
      ZHttpAssert.assert(!!login.password, () => new BadRequestException('Password is required'));
      ZHttpAssert.assert(!!login.confirm, () => new BadRequestException('Password confirmation is required'));
      ZHttpAssert.assert(login.password === login.confirm, () => new BadRequestException('Passwords do not match.'));
      template.password = await hash(login.password, ZUsersController.Rounds);
    }

    if (!template.email && !template.password) {
      const current = currentBlobs[0];
      return new ZUserBuilder().copy(current).redact().build();
    }

    await this._dal.update<IZUser>(Collections.Users, template).filter(idFilter).run();
    const updatedBlobs = await this._dal.read<IZUser>(Collections.Users).filter(idFilter).run();
    const updated = updatedBlobs[0];
    return new ZUserBuilder().copy(updated).redact().build();
  }

  /**
   * Deletes an existing user.
   *
   * @param params The param that contains the id to delete.
   *
   * @return A promise that, when resolve, has returned the deleted user.
   *
   * @throws NotFoundException If no user with the given id exists.
   */
  @Delete(':id')
  public async remove(@Param() params: { id: string }): Promise<IZUser> {
    const pid = params.id;
    const filter = { _id: pid };
    const userBlobs = await this._dal.read<IZUser>(Collections.Users).filter(filter).run();
    ZHttpAssert.assert(userBlobs.length > 0, () => new NotFoundException());

    const user = userBlobs[0];
    await this._dal.delete('users').filter(filter).run();
    return new ZUserBuilder().copy(user).redact().build();
  }
}
