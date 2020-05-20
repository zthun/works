import { Body, ConflictException, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IZUser, ZAssert, ZUserBuilder } from '@zthun/auth.core';
import { ZRuleRequiresAuthSuper } from '../rules/rule-requires-auth-super.guard';
import { ZRuleRequiresExistingUserId } from '../rules/rule-requires-existing-user-id.guard';
import { ZUserCreateDto } from './user-create.dto';
import { ZUserUpdateDto } from './user-update.dto';
import { ZUsersService } from './users.service';

/**
 * Represents a service to retrieve users.
 */
@Controller('users')
export class ZUsersController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _users The user repository
   */
  public constructor(private readonly _users: ZUsersService) {}

  /**
   * Gets a list of all users.
   *
   * @return A promise that, when resolved, has returned all users.
   */
  @Get()
  @UseGuards(ZRuleRequiresAuthSuper)
  public async list(): Promise<IZUser[]> {
    const users = await this._users.list();
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
  @UseGuards(ZRuleRequiresExistingUserId)
  @UseGuards(ZRuleRequiresAuthSuper)
  public async read(@Param() { id }: { id: string }): Promise<IZUser> {
    const user = await this._users.findById(id);
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
    let user = await this._users.findByEmail(login.email);
    ZAssert.claim(!user, 'User email is already taken.').assert((msg) => new ConflictException(msg));
    user = await this._users.create(login);
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
  @UseGuards(ZRuleRequiresExistingUserId)
  @UseGuards(ZRuleRequiresAuthSuper)
  public async update(@Param() { id }: { id: string }, @Body() login: ZUserUpdateDto): Promise<IZUser> {
    if (login.email) {
      const existing = await this._users.findByEmail(login.email);
      ZAssert.claim(!existing || existing._id === id, 'User email is already taken.').assert((msg) => new ConflictException(msg));
    }

    const user = await this._users.update(id, login);
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
  @UseGuards(ZRuleRequiresExistingUserId)
  @UseGuards(ZRuleRequiresAuthSuper)
  public async remove(@Param() { id }: { id: string }): Promise<IZUser> {
    const user = await this._users.findById(id);
    ZAssert.claim(!user.super, 'You cannot delete the super user.').assert((msg) => new ForbiddenException(msg));
    await this._users.remove(id);
    return new ZUserBuilder().copy(user).redact().build();
  }
}
