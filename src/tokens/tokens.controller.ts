import { Controller, Get, NotImplementedException, Param } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('tokens')
export class TokensController {
  public constructor(private _auth: AuthService) { }

  @Get()
  public list() {
    throw new NotImplementedException();
  }

  @Get(':token')
  public async get(@Param() params: any) {
    const token = params.token.startsWith('Bearer') ? params.token : `Bearer ${params.token}`;
    return await this._auth.validate(token);
  }
}
