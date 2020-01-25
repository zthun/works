import { ConflictException, NotFoundException } from '@nestjs/common';
import { IZGroup, IZUser, ZGroupBuilder, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZGroupUserBuilder } from '../common/group-user-builder.class';
import { IZGroupUser } from '../common/group-user.interface';
import { ZGroupsUsersController } from './groups-users.controller';

describe('ZGroupsUsersController', () => {
  let dal: IZDatabase;
  let dc: IZGroup;
  let marvel: IZGroup;
  let batman: IZUser;
  let superman: IZUser;
  let assignment: IZGroupUser;

  function createTestTarget() {
    return new ZGroupsUsersController(dal);
  }

  beforeAll(async () => {
    dal = ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('group-controller-test').timeout(1000).build());

    dc = new ZGroupBuilder().name('DC').system().build();
    marvel = new ZGroupBuilder().name('Marvel').build();
    batman = new ZUserBuilder().email('batman@dc.com').password('bad-password').super().build();
    superman = new ZUserBuilder().email('superman@dc.com').password('also-bad-password').build();

    [dc, marvel] = await dal.create(Collections.Groups, [dc, marvel]).run();
    [batman, superman] = await dal.create(Collections.Users, [batman, superman]).run();
  });

  afterAll(async () => {
    await dal.delete(Collections.Groups).run();
    await dal.delete(Collections.Users).run();
  });

  beforeEach(() => {
    assignment = new ZGroupUserBuilder().groupId(dc._id).userId(batman._id).build();
  });

  afterEach(async () => {
    await dal.delete(Collections.GroupsUsers).run();
  });

  describe('List', () => {
    beforeEach(async () => {
      const dcbatman = new ZGroupUserBuilder().groupId(dc._id).userId(batman._id).build();
      const dcsuperman = new ZGroupUserBuilder().groupId(dc._id).userId(superman._id).build();
      await dal.create(Collections.GroupsUsers, [dcbatman, dcsuperman]).run();
    });

    it('lists all users assigned to the group.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.list({ groupId: dc._id });
      // Assert
      expect(actual).toEqual([batman, superman].map((user) => new ZUserBuilder().copy(user).redact().build()));
    });

    it('throws a not found exception if the group does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.list({ groupId: 'does-not-exist' })).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Update', () => {
    it('assigns a given user to a group.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update(assignment);
      const [actual] = await dal.read(Collections.GroupsUsers).filter(assignment).run();
      // Assert
      expect(actual).toEqual(expect.objectContaining(assignment));
    });

    it('returns the redacted user.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = new ZUserBuilder().copy(batman).redact().build();
      // Act
      const user = await target.update(assignment);
      // Assert
      expect(user).toEqual(expected);
    });

    it('throws a ConflictException if the group already has the user to be assigned.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update(assignment);
      // Assert
      await expect(target.update(assignment)).rejects.toBeInstanceOf(ConflictException);
    });

    it('throws a not found exception if the group does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.groupId = 'does-not-exist';
      // Act
      // Assert
      await expect(target.update(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a not found exception if the user does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.userId = 'does-not-exist';
      // Act
      // Assert
      await expect(target.update(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      await dal.create(Collections.GroupsUsers, [assignment]).run();
    });

    it('removes the user from the group.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.remove(assignment);
      const [actual] = await dal.read<IZUser>(Collections.GroupsUsers).filter(assignment).run();
      // Assert
      expect(actual).toBeFalsy();
    });

    it('returns the redacted user.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = new ZUserBuilder().copy(batman).redact().build();
      // Act
      const user = await target.remove(assignment);
      // Assert
      expect(user).toEqual(expected);
    });

    it('throws a not found exception if the assignment does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.groupId = marvel._id;
      assignment.userId = superman._id;
      // Act
      // Assert
      await expect(target.remove(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a not found exception if the group does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.groupId = 'i-do-not-exist';
      // Act
      // Assert
      await expect(target.remove(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a not found exception if the user does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.userId = 'i-do-not-exist';
      // Act
      // Assert
      await expect(target.remove(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
