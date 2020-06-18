import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IZUser, ZUserBuilder } from '@zthun/works.core';
import { ZRuleBodyRequiresUniqueUser } from '../rules/rule-body-requires-unique-user.guard';
import { ZRuleCookieRequiresAuthSuper } from '../rules/rule-cookie-requires-auth-super.guard';
import { ZRuleParamRequiresExistingUser } from '../rules/rule-param-requires-existing-user.guard';
import { ZRuleParamRequiresRegularUser } from '../rules/rule-param-requires-regular-user.guard';
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
   * @returns A promise that, when resolved, has returned all users.
   */
  @Get()
  @UseGuards(ZRuleCookieRequiresAuthSuper)
  public async list(): Promise<IZUser[]> {
    const users = await this._users.list();
    return users.map((user) => new ZUserBuilder().copy(user).redact().build());
  }

  /**
   * Gets a specific user.
   *
   * @param params The url params.
   *
   * @returns A promise that, when resolved, has the found user.
   */
  @Get(':id')
  @UseGuards(ZRuleCookieRequiresAuthSuper, ZRuleParamRequiresExistingUser)
  public async read(@Param() { id }: { id: string }): Promise<IZUser> {
    const user = await this._users.findById(id);
    return new ZUserBuilder().copy(user).redact().build();
  }

  /**
   * Creates a new user.
   *
   * @param login The user to create.
   *
   * @returns A promise that, when resolved, has returned the new user.
   */
  @Post()
  @UseGuards(ZRuleBodyRequiresUniqueUser)
  public async create(@Body() login: ZUserCreateDto): Promise<IZUser> {
    const user = await this._users.create(login);
    return new ZUserBuilder().copy(user).redact().build();
  }

  /**
   * Updates an existing user.
   *
   * @param params The param that contains the id to update.
   * @param login The user template to update.
   *
   * @returns A promise that, when resolved, has returned the updated user.
   */
  @Put(':id')
  @UseGuards(ZRuleCookieRequiresAuthSuper, ZRuleParamRequiresExistingUser, ZRuleBodyRequiresUniqueUser)
  public async update(@Param() { id }: { id: string }, @Body() login: ZUserUpdateDto): Promise<IZUser> {
    const user = await this._users.update(id, login);
    return new ZUserBuilder().copy(user).redact().build();
  }

  /**
   * Deletes an existing user.
   *
   * @param params The param that contains the id to delete.
   *
   * @returns A promise that, when resolve, has returned the deleted user.
   */
  @Delete(':id')
  @UseGuards(ZRuleCookieRequiresAuthSuper, ZRuleParamRequiresRegularUser)
  public async remove(@Param() { id }: { id: string }): Promise<IZUser> {
    const user = await this._users.remove(id);
    return new ZUserBuilder().copy(user).redact().build();
  }
}
