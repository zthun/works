import { Injectable } from '@nestjs/common';
import { IZEmail, IZLogin, IZProfile, IZUser, ZEmailBuilder, ZEmailEnvelopeBuilder, ZProfileBuilder } from '@zthun/works.core';
import { ZEmailService } from '../../notifications/email.service';
import { ZNotificationsConfigService } from '../../notifications/notifications-config.service';
import { ZUsersService } from '../../users/users.service';
import { ZCommonConfigService } from '../../vault/common-config.service';

@Injectable()
export class ZProfilesService {
  public constructor(private _users: ZUsersService, private _email: ZEmailService, private _commonConfig: ZCommonConfigService, private _notificationsConfig: ZNotificationsConfigService) {}

  public async create(login: IZLogin): Promise<IZProfile> {
    const user = await this._users.create(login);

    if (user.activator) {
      await this.sendActivationEmail(user);
    }

    return new ZProfileBuilder().user(user).build();
  }

  public async update(current: IZUser, profile: IZProfile): Promise<IZProfile> {
    const user = await this._users.update(current._id, profile);
    return new ZProfileBuilder().user(user).build();
  }

  public async remove(current: IZUser): Promise<IZProfile> {
    const user = await this._users.remove(current._id);
    return new ZProfileBuilder().user(user).build();
  }

  public async sendActivationEmail(user: IZUser): Promise<IZEmail> {
    const server = await this._notificationsConfig.smtp();
    const domain = await this._commonConfig.domain();
    const notifier = await this._notificationsConfig.notifier();
    const envelope = new ZEmailEnvelopeBuilder().to(user.email).from(notifier.value).build();
    const subject = `Welcome to ${domain}`;
    const msg = `<h1>Welcome to ${domain}</h1>
      <p>You must activate your account before you can do anything with your profile.  Your activation code is:</p>
      <p><strong>${user.activator.key}</strong></p>
      <p>Your activation code is only good for a limited time.</p>
      <p>Thanks for joining ${domain}.  We hope you enjoy your stay.</p>
    `;
    const email = new ZEmailBuilder().message(msg).subject(subject).envelope(envelope).build();
    await this._email.send(email, server.value);
    return email;
  }
}
