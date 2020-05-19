import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ZJwtService } from './jwt.service';

@Injectable()
export class ZRequiresAuth implements CanActivate {
  public constructor(private readonly _extract: ZJwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const user = await this._extract.extract(request);

    if (!user) {
      throw new UnauthorizedException('You are not authenticated.  Please log in.');
    }

    return true;
  }
}
