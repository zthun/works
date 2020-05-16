import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class ZTokensJsonStrategy extends PassportStrategy(Strategy) {
  public validate(token: string) {
    return Promise.resolve(null);
  }
}
