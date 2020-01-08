import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZGroupsPermissionsController } from './groups-permissions.controller';

describe('ZGroupsPermissionsController', () => {
  let dal: IZDatabase;

  function createTestTarget() {
    return new ZGroupsPermissionsController(dal);
  }

  beforeAll(() => {
    dal = ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('group-controller-test').timeout(1000).build());
  });

  afterEach(async () => {
    await dal.delete(Collections.GroupsPermissions).run();
  });

  describe('List', () => {
    it('lists all permissions assigned to the group.', () => {
      expect(true).toBeTruthy();
    });

    it('throws a not found exception if the group does not exist.', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('Update', () => {
    it('assigns a given permission to a group.', () => {
      expect(true).toBeTruthy();
    });

    it('throws a ConflictException if the group already has the permission to be assigned.', () => {
      expect(true).toBeTruthy();
    });

    it('throws a not found exception if the group does not exist.', () => {
      expect(true).toBeTruthy();
    });

    it('throws a not found exception if the permission does not exist.', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('Delete', () => {
    it('removes the permission from the group.', () => {
      expect(true).toBeTruthy();
    });

    it('throws a not found exception if the group does not exist.', () => {
      expect(true).toBeTruthy();
    });

    it('throws a not found exception if the permission does not exist.', () => {
      expect(true).toBeTruthy();
    });
  });
});
