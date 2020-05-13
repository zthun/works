import { Body, ConflictException, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IZLogin, IZUser, ZUserBuilder } from '@zthun/auth.core';
import { ZHttpAssert } from '../common/http-assert.class';
import { UserServiceToken } from '../common/injection.constants';
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
  public constructor(@Inject(UserServiceToken) private readonly _users: ClientProxy) {}

  /**
   * Gets a list of all users.
   *
   * @return A promise that, when resolved, has returned all users.
   */
  @Get()
  // @UseGuards(ZRequiresSuperUser)
  public async list(): Promise<IZUser[]> {
    const users = await this._users.send<IZUser[]>('list', {}).toPromise();
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
  // @UseGuards(ZRequiresMatchingUser)
  public async read(@Param() { id }: { id: string }): Promise<IZUser> {
    const user = await this._users.send<IZUser, string>('find', id).toPromise();
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
    let user = await this._users.send<IZUser, string>('find', login.email).toPromise();
    ZHttpAssert.assert(!user, () => new ConflictException('User email is already taken.'));
    user = await this._users.send<IZUser, IZLogin>('create', login).toPromise();
    return new ZUserBuilder().copy(user).redact().build();
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
  // @UseGuards(ZRequiresMatchingUser)
  public async update(@Param() { id }: { id: string }, @Body() login: ZUserUpdateDto): Promise<IZUser> {
    let user = await this._users.send<IZUser, string>('find', id).toPromise();
    ZHttpAssert.assert(!!user, () => new NotFoundException(`User with id, ${id}, was not found.`));
    user = await this._users
      .send<IZUser>('update', { id, login })
      .toPromise();
    return new ZUserBuilder().copy(user).redact().build();
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
  // @UseGuards(ZRequiresSuperUser)
  public async remove(@Param() { id }: { id: string }): Promise<IZUser> {
    const user = await this._users.send<IZUser, string>('find', id).toPromise();
    ZHttpAssert.assert(!!user, () => new NotFoundException());
    await this._users.send('remove', id).toPromise();
    return new ZUserBuilder().copy(user).redact().build();
  }
}
