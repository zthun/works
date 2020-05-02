import { Body, ConflictException, Controller, Delete, ForbiddenException, Get, Inject, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IZPermission, ZPermissionBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';
import { ZTokensGuard } from '../tokens/tokens.guard';
import { ZExceptionFactory } from '../validation/exception-factory.class';
import { ZPermissionCreateDto } from './permission-create.dto';
import { ZPermissionUpdateDto } from './permission-update.dto';

@Controller('permissions')
@UseGuards(ZTokensGuard)
export class ZPermissionsController {

  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) { }

  @Get()
  public async list(): Promise<IZPermission[]> {
    return await this._dal.read<IZPermission>(Collections.Permissions).run();
  }

  @Get(':_id')
  public async read(@Param() { _id }: { _id: string }): Promise<IZPermission> {
    const [permission] = await this._dal.read<IZPermission>(Collections.Permissions).filter({ _id }).run();
    ZHttpAssert.assert(!!permission, () => new NotFoundException(`Permission, ${_id}, was not found.`));
    return permission;
  }

  @Post()
  public async create(@Body() template: ZPermissionCreateDto): Promise<IZPermission> {
    const [existingId] = await this._dal.read<IZPermission>(Collections.Permissions).filter({ _id: template._id }).run();
    const [existingName] = await this._dal.read<IZPermission>(Collections.Permissions).filter({ name: template.name }).run();

    let conflicts: string[] = [];
    conflicts = existingId ? conflicts.concat([`Permission id must be unique.`]) : conflicts;
    conflicts = existingName ? conflicts.concat([`Permission name must be unique.`]) : conflicts;
    ZHttpAssert.assert(!conflicts.length, () => new ConflictException(ZExceptionFactory.messageFormat(conflicts)));

    const [created] = await this._dal.create(Collections.Permissions, [template]).run();
    return created;
  }

  @Put(':_id')
  public async update(@Param() { _id }: { _id: string }, @Body() template: ZPermissionUpdateDto): Promise<IZPermission> {
    const [current] = await this._dal.read<IZPermission>(Collections.Permissions).filter({ _id }).run();
    ZHttpAssert.assert(!!current, () => new NotFoundException(`Permission, ${_id}, was not found.`));

    const merged = new ZPermissionBuilder().copy(current).assign(template).assign({ _id }).build();
    const [match] = await this._dal.read<IZPermission>(Collections.Permissions).filter({ name: merged.name, _id: { $ne: merged._id } }).run();
    ZHttpAssert.assert(!match, () => new ConflictException(`Permission name must be unique.`));

    await this._dal.update(Collections.Permissions, merged).filter({ _id }).run();
    const [group] = await this._dal.read<IZPermission>(Collections.Permissions).filter({ _id }).run();
    return group;
  }

  @Delete(':_id')
  public async remove(@Param() { _id }: { _id: string }): Promise<IZPermission> {
    const [permission] = await this._dal.read<IZPermission>(Collections.Permissions).filter({ _id }).run();
    ZHttpAssert.assert(!!permission, () => new NotFoundException(`Permission, ${_id}, was not found.`));
    ZHttpAssert.assert(!permission.system, () => new ForbiddenException(`You cannot delete system permissions.`));
    await this._dal.delete(Collections.Permissions).filter({ _id }).run();
    return permission;
  }
}
