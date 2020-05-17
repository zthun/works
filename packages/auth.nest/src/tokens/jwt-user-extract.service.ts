import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IZUser } from '@zthun/auth.core';
import { Request } from 'express';
import { get } from 'lodash';
import { JwtServiceToken, UserServiceToken } from '../common/injection.constants';

@Injectable()
export class ZJwtUserExtractService {
  public constructor(@Inject(UserServiceToken) private readonly _users: ClientProxy, @Inject(JwtServiceToken) private readonly _jwt: ClientProxy) {}

  public async extract(req: Request): Promise<IZUser> {
    try {
      const token = get(req, 'cookies.Authentication');
      const payload: { user: string } = await this._jwt.send('verify', { token, secret: 'quick-test-must-change-later' }).toPromise();
      const user = await this._users.send('findByEmail', payload.user).toPromise();
      return user;
    } catch {
      return null;
    }
  }
}
