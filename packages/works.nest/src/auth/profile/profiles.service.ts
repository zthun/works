import { Injectable } from '@nestjs/common';
import { IZEmail, IZLogin, IZProfile, IZServer, IZUser, ZConfigEntryBuilder, ZEmailBuilder, ZEmailEnvelopeBuilder, ZProfileBuilder, ZServerBuilder } from '@zthun/works.core';
import { ZEmailService } from '../../notifications/email.service';
import { ZUsersService } from '../../users/users.service';
import { ZVaultService } from '../../vault/vault.service';

@Injectable()
export class ZProfilesService {
  public constructor(private _users: ZUsersService, private _email: ZEmailService, private _vault: ZVaultService) {}

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
    const server = await this._emailServer();
    const domain = await this._domain();
    const notifier = await this._notifier();
    const envelope = new ZEmailEnvelopeBuilder().to(user.email).from(notifier).build();
    const subject = `Welcome to ${domain}`;
    const msg = `<h1>Welcome to ${domain}</h1>
      <p>You must activate your account before you can do anything with your profile.  Your activation code is:</p>
      <p><strong>${user.activator.key}</strong></p>
      <p>Your activation code is only good for a limited time.</p>
      <p>Thanks for joining ${domain}.  We hope you enjoy your stay.</p>
    `;
    const email = new ZEmailBuilder().message(msg).subject(subject).envelope(envelope).build();
    await this._email.send(email, server);
    return email;
  }

  private async _notifier(): Promise<string> {
    const config = new ZConfigEntryBuilder<string>().scope('common').key('notifier').value('notifications@zthunworks.com').build();
    const entry = await this._vault.get<string>(config);
    return entry.value;
  }

  private async _domain(): Promise<string> {
    const config = new ZConfigEntryBuilder<string>().scope('common').key('domain').value('zthunworks.com').build();
    const entry = await this._vault.get<string>(config);
    return entry.value;
  }

  private async _emailServer(): Promise<IZServer> {
    const basic = new ZServerBuilder().address('smtp.zthunworks.com').port(587).build();
    const config = new ZConfigEntryBuilder<IZServer>().scope('common').key('smtp').value(basic).build();
    const entry = await this._vault.get<IZServer>(config);
    return entry.value;
  }
}
