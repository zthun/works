import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IZUser } from '@zthun/works.core';
import { Request } from 'express';
import { ZTokensService } from '../tokens/tokens.service';

@Injectable()
export abstract class ZRuleCookieRequiresAuth implements CanActivate {
  public constructor(private readonly _tokens: ZTokensService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const user = await this._tokens.extract(request);
    this.claim(user);
    return true;
  }

  public abstract claim(user: IZUser): void;
}
