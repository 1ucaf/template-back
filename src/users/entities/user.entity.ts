import { Exclude } from "class-transformer";
import { Permission } from "src/permissions/dictionary/permissions.dictionary";
import { Role } from "src/auth/enums/role.enum";
import { DomainEntity } from "src/lib/entities/domain.entity";
import { Column, Entity } from "typeorm";

@Entity('user')
export class UserEntity extends DomainEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  roles: Role[];

  @Column()
  permissions: Permission[];

  @Column()
  isDeleted: boolean;
}