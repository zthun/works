import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { Request } from 'express';
import { ZUsersService } from '../../users/users.service';
import { ZRuleBodyRequiresUniqueUser } from '../rules/rule-body-requires-unique-user.guard';
import { ZRuleCookieRequiresAuthActivated } from '../rules/rule-cookie-requires-auth-activated.guard';
import { ZRuleCookieRequiresAuthAny } from '../rules/rule-cookie-requires-auth-any.guard';
import { ZRuleCookieRequiresAuthRegular } from '../rules/rule-cookie-requires-auth-regular.guard';
import { ZTokensService } from '../tokens/tokens.service';
import { ZProfileCreateDto } from './profile-create.dto';
import { ZProfileUpdateDto } from './profile-update.dto';

/**
 * Same as the users controller, but uses the cookie to get the id and has different permissions.
 *
 * Used by regular users to retrieve their own information.
 */
@Controller('profiles')
export class ZProfilesController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _tokens The tokens service.
   * @param _users The users service.
   */
  public constructor(private readonly _tokens: ZTokensService, private readonly _users: ZUsersService) {}

  /**
   * Reads the user profile.
   *
   * @param req The request object.
   *
   * @returns The profile object given the requested cookie.
   */
  @Get()
  @UseGuards(ZRuleCookieRequiresAuthAny)
  public async read(@Req() req: Request): Promise<IZProfile> {
    const user = await this._tokens.extract(req);
    return new ZProfileBuilder().user(user).build();
  }

  /**
   * Updates the user profile.
   *
   * @param req The request object.
   * @param profile The profile data to update.
   *
   * @returns The updated user.
   */
  @Put()
  @UseGuards(ZRuleCookieRequiresAuthAny, ZRuleCookieRequiresAuthActivated, ZRuleBodyRequiresUniqueUser)
  public async update(@Req() req: Request, @Body() profile: ZProfileUpdateDto): Promise<IZProfile> {
    let user = await this._tokens.extract(req);
    user = await this._users.update(user._id, profile);
    return new ZProfileBuilder().user(user).build();
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
  public async create(@Body() login: ZProfileCreateDto): Promise<IZProfile> {
    const user = await this._users.create(login);
    return new ZProfileBuilder().user(user).build();
  }

  /**
   * Deletes/Deactivates the given user.
   *
   * @param req The request object.
   *
   * @returns The user that was deactivated/deleted.
   */
  @Delete()
  @UseGuards(ZRuleCookieRequiresAuthAny, ZRuleCookieRequiresAuthRegular, ZRuleCookieRequiresAuthActivated)
  public async remove(@Req() req: Request): Promise<IZProfile> {
    let user = await this._tokens.extract(req);
    user = await this._users.remove(user._id);
    return new ZProfileBuilder().user(user).build();
  }
}
