import { Body, Controller, Delete, Get, Param, Patch, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetUsersQuery } from './queries/getUsers.query';
import { UserRoleDTO } from './dto/userRole.dto';
import { PutUserDTO } from './dto/putUser.dto';
import { Permission } from 'src/permissions/dictionary/permissions.dictionary';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard, PermissionsGuard)
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @Permissions(Permission.USERS_GET)
  getUsers(@Query() query: GetUsersQuery) {
    return this.usersService.getUsers(query);
  }
  @Patch('/activate/:id')
  activateUser(@Param('id') id: string, @Body() body: UserRoleDTO) {
    return this.usersService.activateUser(id, body);
  }
  @Put(':id')
  @Permissions(Permission.USERS_EDIT)
  editUser(@Param('id') id: string, @Body() body: PutUserDTO) {
    return this.usersService.editUser(id, body);
  }
  @Patch('/make-admin/:id')
  @Permissions(Permission.USERS_SET_ADMIN)
  makeAdmin(@Param('id') id: string) {
    return this.usersService.makeAdmin(id);
  }
  @Patch('/permissions/:id')
  @Permissions(Permission.USERS_SET_PERMISSIONS)
  editUserPermissions(@Param('id') id: string, @Body() permissions: Permission[]) {
    return this.usersService.editUserPermissions(id, permissions);
  }
  @Delete(':id')
  @Permissions(Permission.USERS_DELETE)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
