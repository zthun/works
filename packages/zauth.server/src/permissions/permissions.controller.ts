import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IZPermission, ZPermissionBuilder } from '@zthun/auth.core';
import { identity } from 'lodash';
import { Collections } from '../common/collections.enum';
import { ZHttpAssert } from '../common/http-assert.class';
import { identityAsync } from '../common/identity-async.function';
import { IZCrudFlow } from '../crud/crud-flow.interface';
import { ZCrudService } from '../crud/crud.service';
import { ZPermissionCreateDto } from './permission-create.dto';
import { ZPermissionUpdateDto } from './permission-update.dto';

@Controller('permissions')
export class ZPermissionsController implements IZCrudFlow<IZPermission> {
  public collection: () => string = identity.bind(this, Collections.Permissions);
  public sanitize: (item: IZPermission) => Promise<IZPermission> = identityAsync;

  public constructor(private readonly _crud: ZCrudService) { }

  @Get()
  public async list(): Promise<IZPermission[]> {
    return this._crud.list<IZPermission>(this);
  }

  @Get(':_id')
  public async read(@Param() param: { _id: string }): Promise<IZPermission> {
    return this._crud.read(param._id, this);
  }

  @Post()
  public async create(@Body() template: ZPermissionCreateDto): Promise<IZPermission> {
    return this._crud.create(template, this);
  }

  @Put(':_id')
  public async update(@Param() param: { _id: string }, @Body() template: ZPermissionUpdateDto): Promise<IZPermission> {
    return this._crud.update(param._id, template, this);
  }

  @Delete(':_id')
  public remove(@Param() param: { _id: string }): Promise<IZPermission> {
    return this._crud.remove(param._id, this);
  }

  public async validateCreate(template: IZPermission): Promise<IZPermission> {
    const create = new ZPermissionBuilder().copy(template).build();
    const existing = await this._crud.find(create._id, this);
    ZHttpAssert.assert(!existing, () => new ConflictException('Permission id is already taken.'));
    return create;
  }

  public async validateUpdate(original: IZPermission, template: Partial<IZPermission>): Promise<IZPermission> {
    const update = new ZPermissionBuilder().copy(original).assign(template).id(original._id).build();
    return update;
  }

  public async validateRemove(pending: IZPermission): Promise<void> {
    ZHttpAssert.assert(!pending.system, () => new BadRequestException('You cannot delete a system permission.'));
  }
}
