import { ConflictException, Controller, Delete, Get, Inject, NotFoundException, Param, Put } from '@nestjs/common';
import { IZGroup, IZUser, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZGroupUserBuilder } from '../common/group-user-builder.class';
import { IZGroupUser } from '../common/group-user.interface';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';

@Controller('groups/:groupId/users')
export class ZGroupsUsersController {
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) { }

  @Get()
  public async list(@Param() { groupId }: { groupId: string }): Promise<IZUser[]> {
    const [group] = await this._dal.read<IZGroup>(Collections.Groups).filter({ _id: groupId }).run();
    ZHttpAssert.assert(!!group, () => new NotFoundException(`The group with id, ${groupId}, could not be found.`));
    const users = await this._dal.read<IZGroupUser>(Collections.GroupsUsers).join(Collections.Users, 'userId', '_id', 'user').filter({ groupId }).run();
    return users.map((u) => new ZUserBuilder().copy(u.user[0]).redact().build());
  }

  @Put(':userId')
  public async update(@Param() { groupId, userId }: { groupId: string, userId: string }): Promise<IZUser> {
    const [group] = await this._dal.read<IZGroup>(Collections.Groups).filter({ _id: groupId }).run();
    ZHttpAssert.assert(!!group, () => new NotFoundException(`The group with id, ${groupId}, does not exist.`));
    const [user] = await this._dal.read<IZUser>(Collections.Users).filter({ _id: userId }).run();
    ZHttpAssert.assert(!!user, () => new NotFoundException(`The user with id, ${userId}, was not found.`));
    const assignment = new ZGroupUserBuilder().groupId(groupId).userId(userId).build();
    const [current] = await this._dal.read<IZGroupUser>(Collections.GroupsUsers).filter(assignment).run();
    ZHttpAssert.assert(!current, () => new ConflictException('That user is already assigned to the group.'));
    await this._dal.create<IZGroupUser>(Collections.GroupsUsers, [assignment]).run();
    return new ZUserBuilder().copy(user).redact().build();
  }

  @Delete(':userId')
  public async remove(@Param() { groupId, userId }: { groupId: string, userId: string }): Promise<IZUser> {
    const assignment = new ZGroupUserBuilder().groupId(groupId).userId(userId).build();
    const count = await this._dal.delete(Collections.GroupsUsers).filter({ _id: assignment._id }).run();
    ZHttpAssert.assert(!!count, () => new NotFoundException(`The user with id, ${userId}, was not assigned to group with id, ${groupId}`));
    const [user] = await this._dal.read<IZUser>(Collections.Users).filter({ _id: userId }).run();
    return new ZUserBuilder().copy(user).redact().build();
  }
}
