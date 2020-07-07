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
    const subject = `Welcome to ${domain.value}`;
    const msg = `<h1>Welcome to ${domain.value}</h1>
      <p>You must activate your account before you can do anything with your profile.  Your activation code is:</p>
      <p><strong>${user.activator.key}</strong></p>
      <p>Your activation code is only good for a limited time.</p>
      <p>Thanks for joining ${domain.value}.  We hope you enjoy your stay.</p>
    `;
    const email = new ZEmailBuilder().message(msg).subject(subject).envelope(envelope).build();
    await this._email.send(email, server.value);
    return email;
  }

  /**
   * Activates a user.
   *
   * @param email The email of the user to activate.
   *
   * @returns A promise that, when resolved, has activated the user with the given email.
   */
  public async activate(email: string): Promise<IZProfile> {
    let user = await this._users.findByEmail(email);
    user = await this._users.activate(user);
    return new ZProfileBuilder().user(user).build();
  }

  /**
   * Deactivates a user.
   *
   * This does not send an activation email.  If you need to send an activation email
   * along with the activation key, the user reactivate instead.
   *
   * @param email The email of the user to deactivate.
   *
   * @returns A promise that, when resolved, has deactivated the user with the given email.
   */
  public async deactivate(email: string): Promise<IZProfile> {
    const user = await this._deactivateEmail(email);
    return new ZProfileBuilder().user(user).build();
  }

  /**
   * Deactivates the user and sends the user activation email.
   *
   * @param email The email of the user to deactivate and send the email to.
   *
   * @returns A promise that, when resolved, has deactivated the user with the given email.
   */
  public async reactivate(email: string): Promise<IZProfile> {
    const user = await this._deactivateEmail(email);
    await this.sendActivationEmail(user);
    return new ZProfileBuilder().user(user).build();
  }

  /**
   * Deactivates a user.
   *
   * @param email The email address of the user to deactivate.
   *
   * @returns The user that was deactivated.
   */
  private async _deactivateEmail(email: string): Promise<IZUser> {
    let user = await this._users.findByEmail(email);
    user = await this._users.deactivate(user);
    return user;
  }
}
