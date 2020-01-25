import { IZGroup, IZPermission, ZAuthSystemGroup, ZAuthSystemPermission, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZGroupPermissionBuilder } from '../common/group-permission-builder.class';
import { IZGroupPermission } from '../common/group-permission.interface';
import { ZGroupUserBuilder } from '../common/group-user-builder.class';
import { IZGroupUser } from '../common/group-user.interface';
import { ZAuthService } from './auth.service';

describe('ZAuthService', () => {
  let dal: IZDatabase;

  beforeAll(() => {
    dal = ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('auth-service-test').build());
  });

  afterEach(async () => {
    await Promise.all([
      dal.delete(Collections.Groups).run(),
      dal.delete(Collections.Permissions).run(),
      dal.delete(Collections.Users).run(),
      dal.delete(Collections.Tokens).run(),
      dal.delete(Collections.GroupsPermissions).run(),
      dal.delete(Collections.GroupsUsers).run()
    ]);
  });

  function createTestTarget() {
    return new ZAuthService(dal);
  }

  describe('Groups Permissions setup', () => {
    describe('Administrators', () => {
      it('adds all of the system permissions to the administrators group.', async () => {
        // Arrange
        const target = createTestTarget();
        const admin = ZAuthService.constructSystemGroupAdministrators();
        const expected = ZAuthService.constructSystemPermissions().map((per) => per._id).sort();
        // Act
        await target.setupDefaultGroupPermissions();
        const links = await dal.read<IZGroupPermission>(Collections.GroupsPermissions).filter({ groupId: admin._id }).run();
        const actual = links.slice().map((lk) => lk.permissionId).sort();
        // Assert
        expect(actual).toEqual(expected);
      });

      it('adds all of the system permissions that are missing from the associations in the admin group.', async () => {
        // Arrange
        const target = createTestTarget();
        const admin = ZAuthService.constructSystemGroupAdministrators();
        const readGroups = ZAuthService.constructSystemPermissionReadGroups();
        const writeUsers = ZAuthService.constructSystemPermissionEditUsers();
        const expected = ZAuthService.constructSystemPermissions().map((per) => per._id).sort();
        const readGroupsAssignment = new ZGroupPermissionBuilder().group(admin).permission(readGroups).redact().build();
        const writeUsersAssignment = new ZGroupPermissionBuilder().group(admin).permission(writeUsers).redact().build();
        const existing = [readGroupsAssignment, writeUsersAssignment];
        await dal.create(Collections.GroupsPermissions, existing).run();
        // Act
        await target.setupDefaultGroupPermissions();
        const links = await dal.read<IZGroupPermission>(Collections.GroupsPermissions).filter({ groupId: admin._id }).run();
        const actual = links.slice().map((lk) => lk.permissionId).sort();
        // Assert
        expect(actual).toEqual(expected);
      });

      it('adds nothing if the user already has all of the system permissions.', async () => {
        // Arrange
        const target = createTestTarget();
        const admin = ZAuthService.constructSystemGroupAdministrators();
        const expected = ZAuthService.constructSystemPermissions().map((per) => per._id).sort();
        await dal.create(Collections.GroupsPermissions, expected.map((permissionId) => new ZGroupPermissionBuilder().group(admin).permissionId(permissionId).redact().build())).run();
        // Act
        await target.setupDefaultGroupPermissions();
        const links = await dal.read<IZGroupPermission>(Collections.GroupsPermissions).filter({ groupId: admin._id }).run();
        const actual = links.slice().map((lk) => lk.permissionId).sort();
        // Assert
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Groups Users setup', () => {
    describe('Administrators', () => {
      it('adds all of the super users.', async () => {
        // Arrange
        const target = createTestTarget();
        const admin = ZAuthService.constructSystemGroupAdministrators();
        let superUser = new ZUserBuilder().email('admin@whatever.com').password('crummy-password').super().build();
        let normal = new ZUserBuilder().email('normal@gmail.com').password('also-crummy-password').build();
        [superUser, normal] = await dal.create(Collections.Users, [superUser, normal]).run();
        const expected = new ZGroupUserBuilder().group(admin).user(superUser).redact().build();
        // Act
        await target.setupDefaultGroupUsers();
        const links = await dal.read<IZGroupUser>(Collections.GroupsUsers).filter({ groupId: admin._id }).run();
        // Assert
        expect(links).toEqual([expected]);
      });

      it('does not add any additional users if all the super users have already been added.', async () => {
        // Arrange
        const target = createTestTarget();
        const admin = ZAuthService.constructSystemGroupAdministrators();
        let superUser = new ZUserBuilder().email('admin@whatever.com').password('crummy-password').super().build();
        [superUser] = await dal.create(Collections.Users, [superUser]).run();
        let expected = new ZGroupUserBuilder().group(admin).user(superUser).redact().build();
        [expected] = await dal.create(Collections.GroupsUsers, [expected]).run();
        // Act
        await target.setupDefaultGroupUsers();
        const links = await dal.read<IZGroupUser>(Collections.GroupsUsers).filter({ groupId: admin._id }).run();
        // Assert
        expect(links).toEqual([expected]);
      });
    });
  });

  describe('Permission setup', () => {
    it('adds all of the system permissions if there are not already there.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = ZAuthService.constructSystemPermissions();
      // Act
      await target.setupSystemPermissions();
      const actual = await dal.read<IZPermission>(Collections.Permissions).run();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('does not overwrite the system permissions if they already exist.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = ZAuthService.constructSystemPermissions();
      await target.setupSystemPermissions();
      // Act
      await target.setupSystemPermissions();
      const actual = await dal.read<IZPermission>(Collections.Permissions).run();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('only updates permissions that are missing and leaves the rest alone.', async () => {
      // Arrange
      const target = createTestTarget();
      const sorter = (a: IZPermission, b: IZPermission) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
      const expected = ZAuthService.constructSystemPermissions().sort(sorter);
      await target.setupSystemPermissions();
      await dal.delete(Collections.Permissions).filter({ _id: ZAuthSystemPermission.EditGroups }).run();
      await dal.delete(Collections.Permissions).filter({ _id: ZAuthSystemPermission.ReadPermissions }).run();
      // Act
      await target.setupSystemPermissions();
      const permissions = await dal.read<IZPermission>(Collections.Permissions).run();
      const actual = permissions.sort(sorter);
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Group setup', () => {
    it('adds all of the system groups if there are not already there.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = ZAuthService.constructSystemGroups();
      // Act
      await target.setupSystemGroups();
      const actual = await dal.read<IZGroup>(Collections.Groups).run();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('does not overwrite the system groups if they already exist.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = ZAuthService.constructSystemGroups();
      await target.setupSystemGroups();
      // Act
      await target.setupSystemGroups();
      const actual = await dal.read<IZGroup>(Collections.Groups).run();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('only updates groups that are missing and leaves the rest alone.', async () => {
      // Arrange
      const target = createTestTarget();
      const sorter = (a: IZGroup, b: IZGroup) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
      const expected = ZAuthService.constructSystemGroups().sort(sorter);
      await target.setupSystemGroups();
      await dal.delete(Collections.Groups).filter({ _id: ZAuthSystemGroup.Administrators }).run();
      // Act
      await target.setupSystemGroups();
      const groups = await dal.read<IZPermission>(Collections.Groups).run();
      const actual = groups.sort(sorter);
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
