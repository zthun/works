import { IZConfigEntry, IZLogin, IZProfile, IZServer, IZUser, ZConfigEntryBuilder, ZLoginBuilder, ZProfileBuilder, ZUserBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { v4 } from 'uuid';
import { ZEmailService } from '../../notifications/email.service';
import { ZNotificationsConfigService } from '../../notifications/notifications-config.service';
import { ZUsersService } from '../../users/users.service';
import { ZCommonConfigService } from '../../vault/common-config.service';
import { ZProfilesService } from './profiles.service';

describe('ZProfilesService', () => {
  let smtp: IZConfigEntry<IZServer>;
  let notifier: IZConfigEntry<string>;
  let domain: IZConfigEntry<string>;

  let users: jest.Mocked<ZUsersService>;
  let email: jest.Mocked<ZEmailService>;
  let commonConfig: jest.Mocked<ZCommonConfigService>;
  let notificationsConfig: jest.Mocked<ZNotificationsConfigService>;

  function createTestTarget() {
    return new ZProfilesService(users, email, commonConfig, notificationsConfig);
  }

  beforeEach(() => {
    smtp = new ZConfigEntryBuilder().scope(ZNotificationsConfigService.SCOPE).key(ZNotificationsConfigService.KEY_SMTP).value(ZNotificationsConfigService.DEFAULT_SMTP).build();
    notifier = new ZConfigEntryBuilder().scope(ZNotificationsConfigService.SCOPE).key(ZNotificationsConfigService.KEY_NOTIFIER).value(ZNotificationsConfigService.DEFAULT_NOTIFIER).build();

    domain = new ZConfigEntryBuilder().scope(ZCommonConfigService.SCOPE).key(ZCommonConfigService.KEY_DOMAIN).value(ZCommonConfigService.DEFAULT_DOMAIN).build();

    users = createMocked<ZUsersService>(['create', 'update', 'remove', 'activate', 'deactivate', 'findByEmail']);

    email = createMocked<ZEmailService>(['send']);
    email.send.mockReturnValue(Promise.resolve());

    commonConfig = createMocked<ZCommonConfigService>(['domain']);
    commonConfig.domain.mockReturnValue(Promise.resolve(domain));

    notificationsConfig = createMocked<ZNotificationsConfigService>(['smtp', 'notifier']);
    notificationsConfig.notifier.mockReturnValue(Promise.resolve(notifier));
    notificationsConfig.smtp.mockReturnValue(Promise.resolve(smtp));
  });

  describe('Create', () => {
    let login: IZLogin;

    beforeEach(() => {
      login = new ZLoginBuilder().email('gambit@marvel.com').password('not-secure').build();
      users.create.mockImplementation((log) => Promise.resolve(new ZUserBuilder().email(log.email).password(log.password).inactive(v4()).build()));
    });

    it('creates a new user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.create(login);
      // Assert
      expect(actual.email).toEqual(login.email);
    });

    it('sends the activation email.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.create(login);
      // Assert
      expect(email.send).toHaveBeenCalledWith(expect.anything(), smtp.value);
    });

    it('does not send the activation email for the super user.', async () => {
      // Arrange
      users.create.mockClear();
      users.create.mockImplementation((log) => Promise.resolve(new ZUserBuilder().email(log.email).password(log.password).active().super().build()));
      const target = createTestTarget();
      // Act
      await target.create(login);
      // Assert
      expect(email.send).not.toHaveBeenCalled();
    });
  });

  describe('Update', () => {
    let profile: IZProfile;
    let current: IZUser;

    beforeEach(() => {
      current = new ZUserBuilder().id(v4()).email('gambit@marvel.com').active().password('not-very-secure').build();
      profile = new ZProfileBuilder().display('Gambit').build();

      users.update.mockImplementation((id, prof) => Promise.resolve(new ZUserBuilder().id(id).email(current.email).display(prof.display).active().password(current.password).build()));
    });

    it('updates the specified user with the given profile.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update(current, profile);
      // Assert
      expect(users.update).toHaveBeenCalledWith(current._id, profile);
    });

    it('sends the activation email if the user is deactivated.', async () => {
      // Arrange
      users.update.mockImplementation((id, prof) => Promise.resolve(new ZUserBuilder().id(id).email(current.email).display(prof.display).inactive(v4()).password(current.password).build()));
      const target = createTestTarget();
      // Act
      await target.update(current, profile);
      // Assert
      expect(email.send).toHaveBeenCalledWith(expect.anything(), smtp.value);
    });
  });

  describe('Remove', () => {
    let current: IZUser;

    beforeEach(() => {
      current = new ZUserBuilder().id(v4()).email('gambit@marvel.com').display('Gambit').active().password('not-very-secure').build();
      users.remove.mockImplementation(() => Promise.resolve(current));
    });

    it('removes the specified user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.remove(current);
      // Assert
      expect(users.remove).toHaveBeenCalledWith(current._id);
    });
  });

  describe('Activate', () => {
    let user: IZUser;

    beforeEach(() => {
      user = new ZUserBuilder().email('gambit@marvel.com').password('not-really-secure').inactive(v4()).build();

      users.findByEmail.mockReturnValue(Promise.resolve(user));
      users.activate.mockReturnValue(Promise.resolve(user));
      users.deactivate.mockReturnValue(Promise.resolve(user));
    });

    it('sends the activation email with the activator key.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.sendActivationEmail(user);
      // Assert
      expect(email.send).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining(user.activator.key) }), smtp.value);
    });

    it('activates the user with the given email.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.activate(user.email);
      // Assert
      expect(users.activate).toHaveBeenCalledWith(user);
    });

    it('deactivates the user with the given email.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.deactivate(user.email);
      // Assert
      expect(users.deactivate).toHaveBeenCalledWith(user);
    });

    it('deactivate the user before sending the activation mail.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.reactivate(user.email);
      // Assert
      expect(users.deactivate).toHaveBeenCalledWith(user);
    });

    it('sends the activation email after deactivating the user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.reactivate(user.email);
      // Assert
      expect(email.send).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining(user.activator.key) }), smtp.value);
    });
  });
});
