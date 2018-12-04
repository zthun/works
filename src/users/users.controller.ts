import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IPrivateUser } from './private-user.interface';
import { IPublicUser } from './public-user.interface';
import { IUserEmail } from './user-email.interface';
import { IUserPassword } from './user-password.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  public constructor(private service: UsersService) { }

  @Get()
  public list(): Promise<IPublicUser[]> {
    return this.service.list();
  }

  @Get(':id')
  public read(@Param() params: any): Promise<IPublicUser> {
    return this.service.read(params.id);
  }

  @Post()
  public async create(@Body() user: IPrivateUser): Promise<IPublicUser> {
    return await this.service.create(user);
  }

  @Put(':id/emails')
  public updateEmail(@Param() params: any, @Body() email: IUserEmail): Promise<IPublicUser> {
    return this.service.updateEmail(params.id, email);
  }

  @Put(':id/passwords')
  public updatePassword(@Param() params: any, @Body() pwd: IUserPassword): Promise<IPublicUser> {
    return this.service.updatePassword(params.id, pwd);
  }

  @Delete(':id')
  public remove(@Param() params: any): Promise<IPublicUser> {
    return this.service.remove(params.id);
  }
}
