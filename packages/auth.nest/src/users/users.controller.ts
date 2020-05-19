import { Body, ConflictException, Controller, Delete, ForbiddenException, Get, Inject, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IZLogin, IZUser, ZAssert, ZUserBuilder } from '@zthun/auth.core';
import { UserServiceToken } from '../common/injection.constants';
import { ZRequiresAuthSuper } from '../tokens/requires-auth-super.guard';
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
  @UseGuards(ZRequiresAuthSuper)
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
  @UseGuards(ZRequiresAuthSuper)
  public async read(@Param() { id }: { id: string }): Promise<IZUser> {
    const user = await this._users.send<IZUser, string>('findById', id).toPromise();
    ZAssert.claim(!!user, `User with id, ${id}, was not found.`).assert((msg) => new NotFoundException(`User with id, ${id}, was not found.`));
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
    let user = await this._users.send<IZUser, string>('findByEmail', login.email).toPromise();
    ZAssert.claim(!user, 'User email is already taken.').assert((msg) => new ConflictException(msg));
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
  @UseGuards(ZRequiresAuthSuper)
  public async update(@Param() { id }: { id: string }, @Body() login: ZUserUpdateDto): Promise<IZUser> {
    let user = await this._users.send<IZUser, string>('findById', id).toPromise();
    ZAssert.claim(!!user, `User with id, ${id}, was not found.`).assert((msg) => new NotFoundException(msg));

    if (login.email) {
      const existing = await this._users.send<IZUser, string>('findByEmail', login.email).toPromise();
      ZAssert.claim(!existing || existing._id === id, 'User email is already taken.').assert((msg) => new ConflictException(msg));
    }

    const payload = { id, login };
    user = await this._users.send<IZUser>('update', payload).toPromise();
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
  @UseGuards(ZRequiresAuthSuper)
  public async remove(@Param() { id }: { id: string }): Promise<IZUser> {
    const user = await this._users.send<IZUser, string>('findById', id).toPromise();
    ZAssert.claim(!!user, `User with id, ${id}, was not found.`).assert((msg) => new NotFoundException(msg));
    ZAssert.claim(!user.super, 'You cannot delete the super user.').assert((msg) => new ForbiddenException(msg));
    await this._users.send('remove', id).toPromise();
    return new ZUserBuilder().copy(user).redact().build();
  }
}
