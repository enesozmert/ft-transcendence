import * as common from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { UserService } from 'src/business/concrete/user/user.service';

@common.Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  // @common.Post()
  // create(@common.Body() user: User) {
  //   return this.usersService.create(user);
  // }

  @common.Get('/getall')
  async getAll() {
    const result = this.usersService.getAll();
    if ((await result).success) return result;
    throw new BadRequestException(result);
  }

  @common.Get('/getbyid')
  findOne(@common.Query('id') id: string) {
    return this.usersService.getById(+id);
  }

  // @common.Patch(':id')
  // update(@common.Param('id') id: string, @common.Body() user: User) {
  //   return this.usersService.update(+id, user);
  // }

  // @common.Delete(':id')
  // delete(@common.Param('id') id: string) {
  //   return this.usersService.delete(+id);
  // }
}
