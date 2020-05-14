import { Body, Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtServiceToken, UserServiceToken } from '../common/injection.constants';
import { ZTokensLoginDto } from './tokens-login.dto';

/**
 * The controller for logging the user in and out.
 */
@Controller('tokens')
export class ZTokensController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _users The users client proxy.
   * @param _tokens The jwt tokens client proxy.
   */
  public constructor(@Inject(UserServiceToken) private readonly _users: ClientProxy, @Inject(JwtServiceToken) private readonly _tokens: ClientProxy) {}

  /**
   * Convinence method for UIs that want route guards for token auth.
   *
   * Returns a status of 204 if your cookie token is valid, and 401 if not authenticated.
   *
   * @returns A Promise that resolves to a status of 20 if the cookie token is valid, and 401 if it is not authenticated.
   */
  @Get()
  // @UseGuards(ZRequiresUser)
  public async verify() {
    return undefined;
  }

  /**
   * Logs the user into the system.
   *
   * @param credentials The user credentials.
   *
   * @returns A promise that resolves to a status of 204 if the cookie token is valid, and 401 if the user cannot login.  The return will
   */
  @Post()
  public async login(@Body() credentials: ZTokensLoginDto) {
    return undefined;
  }

  /**
   * Removes the cookie data.
   */
  @Delete()
  // @UseGuards(ZRequiresUser)
  public async logout() {
    return undefined;
  }
}
