import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { IZPermission, ZPermissionBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';

@Controller('permissions')
export class ZPermissionsController {
  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) { }

  @Get()
  public async list(): Promise<IZPermission[]> {
    return await this._dal.read<IZPermission>(Collections.Permissions).run();
  }

  @Get(':_id')
  public async read(@Param() param: { _id: string }): Promise<IZPermission> {
    const blobs = await this._dal.read<IZPermission>(Collections.Permissions).filter({ _id: param._id }).run();
    ZHttpAssert.assert(blobs.length > 0, () => new NotFoundException());
    return blobs[0];
  }

  @Post()
  public async create(@Body() template: IZPermission): Promise<IZPermission> {
    ZHttpAssert.assert(!!template._id, () => new BadRequestException('Permission id is required.'));
    ZHttpAssert.assert(!!template.name, () => new BadRequestException('Permission name is required.'));
    const count = await this._dal.count(Collections.Permissions).filter({ _id: template._id }).run();
    ZHttpAssert.assert(count === 0, () => new ConflictException('Permission id is already taken.'));
    const blobs = await this._dal.create(Collections.Permissions, [template]).run();
    return blobs[0];
  }

  @Put(':_id')
  public async update(@Param() param: { _id: string }, @Body() template: Partial<IZPermission>): Promise<IZPermission> {
    const filter = { _id: param._id };
    let blobs = await this._dal.read<IZPermission>(Collections.Permissions).filter(filter).run();
    ZHttpAssert.assert(blobs.length > 0, () => new NotFoundException());
    const existing = blobs[0];
    const updated = new ZPermissionBuilder().copy(existing).assign(template).id(existing._id).build();
    ZHttpAssert.assert(!!updated.name, () => new BadRequestException('Permission name is required.'));
    await this._dal.update<IZPermission>(Collections.Permissions, updated).filter(filter).run();
    blobs = await this._dal.read<IZPermission>(Collections.Permissions).filter(filter).run();
    return blobs[0];
  }

  @Delete(':_id')
  public async remove(@Param() param: { _id: string }): Promise<IZPermission> {
    const filter = { _id: param._id };
    const blobs = await this._dal.read<IZPermission>(Collections.Permissions).filter(filter).run();
    ZHttpAssert.assert(blobs.length > 0, () => new NotFoundException());
    const permission = blobs[0];
    await this._dal.delete(Collections.Permissions).filter(filter).run();
    return permission;
  }
}
