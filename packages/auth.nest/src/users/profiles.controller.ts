import { Body, Controller, Delete, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ZUserBuilder } from '@zthun/auth.core';
import { Request } from 'express';
import { ZRuleBodyRequiresUniqueUser } from '../rules/rule-body-requires-unique-user.guard';
import { ZRuleCookieRequiresAuthRegular } from '../rules/rule-cookie-requires-auth-regular.guard';
import { ZRuleCookieRequiresAuth } from '../rules/rule-cookie-requires-auth.guard';
import { ZJwtService } from '../tokens/jwt.service';
import { ZUserUpdateDto } from './user-update.dto';
import { ZUsersService } from './users.service';

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
   * @param _jwt The jwt service.
   * @param _users The users service.
   */
  public constructor(private readonly _jwt: ZJwtService, private readonly _users: ZUsersService) {}

  /**
   * Reads the user profile.
   *
   * @param req The request object.
   *
   * @returns The redacted user object.
   */
  @Get()
  @UseGuards(ZRuleCookieRequiresAuth)
  public async read(@Req() req: Request) {
    const user = await this._jwt.extract(req);
    return new ZUserBuilder().copy(user).redact().build();
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
  @UseGuards(ZRuleCookieRequiresAuth, ZRuleBodyRequiresUniqueUser)
  public async update(@Req() req: Request, @Body() profile: ZUserUpdateDto) {
    let user = await this._jwt.extract(req);
    user = await this._users.update(user._id, profile);
    return new ZUserBuilder().copy(user).redact().build();
  }

  /**
   * Deletes/Deactivates the given user.
   *
   * TODO:  A user is only deactivated if this method is called.  If the user
   * is already deactivated, then they are deleted.
   *
   * @param req The request object.
   *
   * @returns The user that was deactivated/deleted.
   */
  @Delete()
  @UseGuards(ZRuleCookieRequiresAuthRegular)
  public async remove(@Req() req: Request) {
    let user = await this._jwt.extract(req);
    user = await this._users.remove(user._id);
    return new ZUserBuilder().copy(user).redact().build();
  }
}
