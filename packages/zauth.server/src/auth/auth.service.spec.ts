import { IZGroup, IZPermission, ZAuthSystemGroup, ZAuthSystemPermission } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZAuthService } from './auth.service';

describe('ZAuthService', () => {
  let dal: IZDatabase;

  beforeAll(() => {
    dal = ZDatabaseMemory.connect('auth-service-test');
  });

  afterEach(async () => {
    await Promise.all([
      dal.delete(Collections.Groups).run(),
      dal.delete(Collections.Permissions).run(),
      dal.delete(Collections.Users).run(),
      dal.delete(Collections.Tokens).run()
    ]);
  });

  function createTestTarget() {
    return new ZAuthService(dal);
  }

  describe('Permission setup.', () => {
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
