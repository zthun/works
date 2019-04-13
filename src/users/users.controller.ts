import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { IZDatabase } from '@zthun/dal';
import { pick } from 'lodash';
import { v4 } from 'uuid';
import { ZHttpAssert } from '../util/http-assert.class';
import { ZUserBuilder } from './user-builder.class';
import { IZUser } from './user.interface';

/**
 * Represents a service to retrieve users.
 */
@Controller('users')
export class ZUsersController {
  /**
   * The collection that this controller modifies.
   */
  public static readonly Collection = 'users';

  /**
   * Initializes a new instance of this object.
   *
   * @param _dal The data access layer.
   */
  public constructor(@Inject('AuthDatabase') private readonly _dal: IZDatabase) { }

  /**
   * Gets a list of all users.
   *
   * @return A promise that, when resolved, has returned all users.
   */
  @Get()
  public async list(): Promise<IZUser[]> {
    const users = await this._dal.read<IZUser>(ZUsersController.Collection).run();
    return users.map((user) => ZUserBuilder.public(user).user());
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
    const user = await this._dal.read<IZUser>(ZUsersController.Collection).filter(filter).run();
    ZHttpAssert.assert(user.length > 0, () => new NotFoundException());
    return ZUserBuilder.public(user[0]).user();
  }

  /**
   * Creates a new user.
   *
   * @param user The user to create.
   *
   * @return A promise that, when resolved, has returned the new user.
   *
   * @throws ConflictException If a user already has the same name or already exists.
   */
  @Post()
  public async create(@Body() user: IZUser): Promise<IZUser> {
    const filter = pick(user, 'email');
    ZHttpAssert.assert(!!user.email, () => new BadRequestException('User email is required.'));
    ZHttpAssert.assert(!!user.password, () => new BadRequestException('Password is required.'));

    const count = await this._dal.count(ZUsersController.Collection).filter(filter).run();
    ZHttpAssert.assert(count === 0, () => new ConflictException('User email is already taken.'));

    const create = ZUserBuilder.empty().merge(user).salt(v4()).encode().user();
    delete create._id;
    const list = await this._dal.create(ZUsersController.Collection, [create]).run();
    const created = list[0];
    return ZUserBuilder.public(created).user();
  }

  /**
   * Updates an existing user.
   *
   * @param params The param that contains the id to update.
   * @param user The user template to update.
   *
   * @return A promise that, when resolved, has returned the updated user.
   *
   * @throws NotFoundException If not user exists with the given id.
   * @throws ConflictException If the name of the user changes and there is already another user with the same name.
   */
  @Put(':id')
  public async update(@Param() params: { id: string }, @Body() user: Partial<IZUser>): Promise<IZUser> {
    const pid = params.id;
    const email = user.email;

    const idFilter = { _id: pid };
    const existingList = await this._dal.read<IZUser>(ZUsersController.Collection).filter(idFilter).run();
    ZHttpAssert.assert(existingList.length > 0, () => new NotFoundException());

    const emailFilter = { email, _id: { $ne: pid } };
    const count = await this._dal.count(ZUsersController.Collection).filter(emailFilter).run();
    ZHttpAssert.assert(count === 0, () => new ConflictException('User name is already taken.'));

    const current = existingList[0];
    let update = ZUserBuilder.empty().merge(current).merge(user);

    if (user.password) {
      update = update.salt(v4()).encode();
    }

    await this._dal.update<IZUser>(ZUsersController.Collection, update.user()).filter(idFilter).run();

    return ZUserBuilder.public(update.user()).user();
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
    const user = await this._dal.read<IZUser>(ZUsersController.Collection).filter(filter).run();
    ZHttpAssert.assert(user.length > 0, () => new NotFoundException());

    await this._dal.delete('users').filter(filter).run();
    return ZUserBuilder.public(user[0]).user();
  }
}
