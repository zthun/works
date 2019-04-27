import { Body, Controller, Delete, Put } from '@nestjs/common';
import { ZLoginsService } from './logins.service';
import { IZUser, IZLogin } from '@zthun/auth.core';

/**
 * Represents a controller for managing logins.
 */
@Controller('logins')
export class ZLoginsController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _service The service to login and log out.
   */
  public constructor(private readonly _service: ZLoginsService) { }

  /**
   * Logs the user in.
   *
   * @param login The post body.
   */
  @Put()
  public update(@Body() login: IZLogin): Promise<IZUser> {
    return this._service.login(login);
  }

  /**
   * Logs the user out.
   *
   * @param params The url params.
   */
  @Delete()
  public remove(params: { id: string }): Promise<IZUser> {
    return this._service.logout(params.id);

  }
}
