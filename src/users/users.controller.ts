import { Body, Controller, Get, Param, Patch, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetUsersQuery } from './queries/getUsers.query';
import { UserRoleDTO } from './dto/userRole.dto';
import { PutUserDTO } from './dto/putUser.dto';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(@Query() query: GetUsersQuery) {
    return this.usersService.getUsers(query);
  }
  @Patch('/activate/:id')
  activateUser(@Param('id') id: string, @Body() body: UserRoleDTO) {
    return this.usersService.activateUser(id, body);
  }
  @Patch('/make-admin/:id')
  makeAdmin(@Param('id') id: string) {
    return this.usersService.makeAdmin(id);
  }
  @Put(':id')
  editUser(@Param('id') id: string, @Body() body: PutUserDTO) {
    return this.usersService.editUser(id, body);
  }
}
