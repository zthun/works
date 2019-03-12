import { Controller, Get, NotImplementedException, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { TokensService } from './tokens.service';
import { IUserToken } from './user-token.interface';

@Controller('tokens')
export class TokensController {
  public constructor(private _service: TokensService) { }

  @Get(':token')
  public async get(@Param() params: any) {
    const token = params.token.startsWith('Bearer') ? params.token : `Bearer ${params.token}`;
    return await this._service.authenticate(token);
  }

  @Post()
  public async create(@Req() req: Request): Promise<IUserToken> {
    const token = await this._service.token(req);

    return {
      _id: token.accessToken,
      expire: token.accessTokenExpiresAt,
      user: token.user._id
    };
  }
}
