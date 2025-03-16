import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getPaginatedQuery } from 'src/lib/utils/paginatedQuery';
import { GetUsersQuery } from './queries/getUsers.query';
import { Role } from 'src/auth/enums/role.enum';
import { UserRoleDTO } from './dto/userRole.dto';
import { PutUserDTO } from './dto/putUser.dto';

interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  async getUsers(query: GetUsersQuery) {
    const {
      role,
      isActive,
    } = query;
    const where: any = {};
    if (role) {
      if(role === Role.USER) where.roles = { $in: [Role.USER], $not: { $in: [Role.ADMIN] } };
      else where.roles = { $in: [role] };
    };
    if(isActive !== undefined) where.isActive = isActive;
    const findQuery = getPaginatedQuery<GetUsersQuery, UserEntity>({
      query,
      searchByArray: ['name', 'email'],
      otherWhereConditions: where,
    });
    const [results, count] = await this.usersRepository.findAndCount(findQuery);
    const totalPages = Math.ceil(count / query.pageSize);
    return {
      results,
      count,
      totalPages,
      page: query.page,
      pageSize: query.pageSize,
    }
  }
  getById(id: string) {
    return this.usersRepository.findOne({
      where: { id }
    });
  }
  getByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email }
    });
  }
  async createUser(user: IUserCreate) {
    
    const newUser: UserEntity = await this.usersRepository.create({
      ...user,
      isActive: false,
    });

    return await this.usersRepository.save(newUser);
  }
  activateUser(userId: string, body: UserRoleDTO) {
    return this.usersRepository.update(
      { id: userId },
      {
        isActive: true,
        roles: body.roles,
      }
    );
  }
  makeAdmin(userId: string) {
    return this.usersRepository.update(
      { id: userId },
      {
        roles: [Role.USER, Role.ADMIN],
      }
    );
  }
  editUser(userId: string, body: PutUserDTO) {
    return this.usersRepository.update(
      { id: userId },
      {
        roles: body.roles,
        name: body.name,
        email: body.email
      }
    );
  }
}
