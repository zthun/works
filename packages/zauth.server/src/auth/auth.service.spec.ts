import { IZGroup, IZPermission, ZAuthSystemGroup, ZAuthSystemPermission } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZGroupPermissionBuilder } from '../common/group-permission-builder.class';
import { IZGroupPermission } from '../common/group-permission.interface';
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
        const admin = target.constructSystemGroupAdministrators();
        const expected = target.constructSystemPermissions().map((per) => per._id).sort();
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
        const admin = target.constructSystemGroupAdministrators();
        const readGroups = target.constructSystemPermissionReadGroups();
        const writeUsers = target.constructSystemPermissionEditUsers();
        const expected = target.constructSystemPermissions().map((per) => per._id).sort();
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
        const admin = target.constructSystemGroupAdministrators();
        const expected = target.constructSystemPermissions().map((per) => per._id).sort();
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

  describe('Permission setup', () => {
    it('adds all of the system permissions if there are not already there.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = target.constructSystemPermissions();
      // Act
      await target.setupSystemPermissions();
      const actual = await dal.read<IZPermission>(Collections.Permissions).run();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('does not overwrite the system permissions if they already exist.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = target.constructSystemPermissions();
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
      const expected = target.constructSystemPermissions().sort(sorter);
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
      const expected = target.constructSystemGroups();
      // Act
      await target.setupSystemGroups();
      const actual = await dal.read<IZGroup>(Collections.Groups).run();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('does not overwrite the system groups if they already exist.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = target.constructSystemGroups();
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
      const expected = target.constructSystemGroups().sort(sorter);
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
