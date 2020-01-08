import { ConflictException, Controller, Delete, Get, Inject, NotFoundException, Param, Put } from '@nestjs/common';
import { IZPermission } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { IZGroupsPermissions } from '../common/groups-permissions.interface';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';

@Controller('groups/:groupId/permissions')
export class ZGroupsPermissionsController {
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) { }

  @Get()
  public async list(@Param() { groupId }: { groupId: string }): Promise<IZPermission[]> {
    const permissions = await this._dal.read<IZGroupsPermissions>(Collections.GroupsPermissions).join(Collections.Permissions, 'permissionId', '_id', 'permission').filter({ groupId }).run();
    return permissions.map((p) => p.permission[0]);
  }

  @Put(':permissionId')
  public async update(@Param() { groupId, permissionId }: { groupId: string, permissionId: string }): Promise<IZPermission> {
    const assignment: IZGroupsPermissions = { groupId, permissionId };
    const [current] = await this._dal.read<IZGroupsPermissions>(Collections.GroupsPermissions).filter(assignment).run();
    ZHttpAssert.assert(!current, () => new ConflictException('That permission is already assigned to the group.'));
    const [created] = await this._dal.create<IZGroupsPermissions>(Collections.GroupsPermissions, [assignment]).run();
    const [permission] = await this._dal.read<IZPermission>(Collections.Permissions).filter({ _id: created.permissionId }).run();
    return permission;
  }

  @Delete(':permissionId')
  public async remove(@Param() { groupId, permissionId }: { groupId: string, permissionId: string }): Promise<IZPermission> {
    const assignment: IZGroupsPermissions = { groupId, permissionId };
    const count = await this._dal.delete(Collections.GroupsPermissions).filter(assignment).run();
    ZHttpAssert.assert(!!count, () => new NotFoundException(`The permission with id, ${permissionId}, was not assigned to group with id, ${groupId}`));
    const [permission] = await this._dal.read<IZPermission>(Collections.Permissions).filter({ _id: permissionId }).run();
    return permission;
  }
}
