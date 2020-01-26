import { Body, ConflictException, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IZUser, ZAuthSystemGroup, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { hash } from 'bcryptjs';
import { Collections } from '../common/collections.enum';
import { BcryptRounds } from '../common/crypt.constants';
import { ZGroupUserBuilder } from '../common/group-user-builder.class';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';
import { ZTokensGuard } from '../tokens/tokens.guard';
import { ZUserCreateDto } from './user-create.dto';
import { ZUserUpdateDto } from './user-update.dto';

/**
 * Represents a service to retrieve users.
 */
@Controller('users')
export class ZUsersController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _dal The data access layer.
   * @param _auth The auth service for simple tasks.
   */
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) { }

  /**
   * Gets a list of all users.
   *
   * @return A promise that, when resolved, has returned all users.
   */
  @Get()
  @UseGuards(ZTokensGuard)
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
  @UseGuards(ZTokensGuard)
  public async read(@Param() { id }: { id: string }): Promise<IZUser> {
    const [user] = await this._dal.read<IZUser>(Collections.Users).filter({ _id: id }).run();
    ZHttpAssert.assert(!!user, () => new NotFoundException());
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
  public async create(@Body() login: ZUserCreateDto): Promise<IZUser> {
    const count = await this._dal.count(Collections.Users).filter({ email: login.email }).run();
    ZHttpAssert.assert(count === 0, () => new ConflictException('User email is already taken.'));

    const total = await this._dal.count(Collections.Users).run();
    const password = await hash(login.password, BcryptRounds);
    const builder = new ZUserBuilder().email(login.email).password(password);
    const create = total === 0 ? builder.super().build() : builder.build();
    const [created] = await this._dal.create(Collections.Users, [create]).run();

    if (created.super) {
      const assignment = new ZGroupUserBuilder().groupId(ZAuthSystemGroup.Administrators).user(created).redact().build();
      await this._dal.create(Collections.GroupsUsers, [assignment]).run();
    }

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
  @UseGuards(ZTokensGuard)
  public async update(@Param() { id }: { id: string }, @Body() login: ZUserUpdateDto): Promise<IZUser> {
    const [user] = await this._dal.read<IZUser>(Collections.Users).filter({ _id: id }).run();
    ZHttpAssert.assert(!!user, () => new NotFoundException(`User with id, ${id}, was not found.`));

    const template: Partial<IZUser> = {};

    if (login.email) {
      const emailFilter = { email: login.email, _id: { $ne: id } };
      const count = await this._dal.count(Collections.Users).filter(emailFilter).run();
      ZHttpAssert.assert(count === 0, () => new ConflictException('User email is not available.'));
      template.email = login.email;
    }

    if (login.password) {
      template.password = await hash(login.password, BcryptRounds);
    }

    if (!template.email && !template.password) {
      return new ZUserBuilder().copy(user).redact().build();
    }

    await this._dal.update<IZUser>(Collections.Users, template).filter({ _id: id }).run();
    const [updated] = await this._dal.read<IZUser>(Collections.Users).filter({ _id: id }).run();
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
  @UseGuards(ZTokensGuard)
  public async remove(@Param() { id }: { id: string }): Promise<IZUser> {
    const [user] = await this._dal.read<IZUser>(Collections.Users).filter({ _id: id }).run();
    ZHttpAssert.assert(!!user, () => new NotFoundException());
    await this._dal.delete(Collections.GroupsUsers).filter({ userId: id }).run();
    await this._dal.delete(Collections.Users).filter({ _id: id }).run();
    return new ZUserBuilder().copy(user).redact().build();
  }
}
