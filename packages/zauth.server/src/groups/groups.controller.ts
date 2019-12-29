import { Body, ConflictException, Controller, Delete, ForbiddenException, Get, Inject, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { IZGroup, ZGroupBuilder } from '@zthun/auth.core';
import { IZDatabase } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZHttpAssert } from '../common/http-assert.class';
import { DatabaseToken } from '../common/injection.constants';
import { ZGroupCreateDto } from './group-create.dto';
import { ZGroupUpdateDto } from './group-update.dto';

@Controller('groups')
export class ZGroupsController {

  public constructor(@Inject(DatabaseToken) private readonly _dal: IZDatabase) { }

  @Get()
  public async list(): Promise<IZGroup[]> {
    return await this._dal.read<IZGroup>(Collections.Groups).run();
  }

  @Get(':_id')
  public async read(@Param() { _id }: { _id: string }): Promise<IZGroup> {
    const [group] = await this._dal.read<IZGroup>(Collections.Groups).filter({ _id }).run();
    ZHttpAssert.assert(!!group, () => new NotFoundException(`Group, ${_id}, was not found.`));
    return group;
  }

  @Post()
  public async create(@Body() template: ZGroupCreateDto): Promise<IZGroup> {
    const [existing] = await this._dal.read<IZGroup>(Collections.Groups).filter({ name: template.name }).run();
    ZHttpAssert.assert(!existing, () => new ConflictException(`Group name must be unique.`));
    const [created] = await this._dal.create(Collections.Groups, [template]).run();
    return created;
  }

  @Put(':_id')
  public async update(@Param() { _id }: { _id: string }, @Body() template: ZGroupUpdateDto): Promise<IZGroup> {
    const [current] = await this._dal.read<IZGroup>(Collections.Groups).filter({ _id }).run();
    ZHttpAssert.assert(!!current, () => new NotFoundException(`Group, ${_id}, was not found.`));

    const merged = new ZGroupBuilder().copy(current).assign(template).build();
    const [match] = await this._dal.read<IZGroup>(Collections.Groups).filter({ name: merged.name, _id: { $ne: merged._id } }).run();
    ZHttpAssert.assert(!match, () => new ConflictException(`Group name must be unique.`));

    await this._dal.update(Collections.Groups, merged).filter({ _id }).run();
    const [group] = await this._dal.read<IZGroup>(Collections.Groups).filter({ _id }).run();
    return group;
  }

  @Delete(':_id')
  public async remove(@Param() { _id }: { _id: string }): Promise<IZGroup> {
    const [group] = await this._dal.read<IZGroup>(Collections.Groups).filter({ _id }).run();
    ZHttpAssert.assert(!!group, () => new NotFoundException(`Group, ${_id}, was not found.`));
    ZHttpAssert.assert(!group.system, () => new ForbiddenException(`You cannot delete system groups.`));
    await this._dal.delete(Collections.Groups).filter({ _id }).run();
    return group;
  }
}
