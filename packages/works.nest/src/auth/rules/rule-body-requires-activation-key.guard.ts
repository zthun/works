import { CanActivate, ConflictException, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { IZProfileActivation, ZAssert } from '@zthun/works.core';
import { Request } from 'express';
import { ZTokensService } from '../tokens/tokens.service';

/**
 * Represents a rule that states that a request body must be an IZProfileActivation object and
 */
@Injectable()
export class ZRuleBodyRequiresActivationKey implements CanActivate {
  public constructor(private readonly _tokens: ZTokensService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const activation = request.body as IZProfileActivation;
    const user = await this._tokens.extract(request);
    const tick = new Date().getTime();

    ZAssert.claim(!!user.activator, 'This user is already activated.').assert((msg) => new ConflictException(msg));
    ZAssert.claim(user.email === activation.email, 'You cannot activate another user.')
      .claim(user.activator.exp > tick, 'The activation key has expired.  Please send yourself another activation key.')
      .claim(user.activator.key === activation.key, 'The activation key does not match.  Please try again or send yourself another activation key.')
      .assert((msg) => new ForbiddenException(msg));

    return true;
  }
}
