import { DomainEntity } from "src/lib/entities/domain.entity";
import { Column, Entity } from "typeorm";

@Entity("books")
export class BookEntity extends DomainEntity {
  @Column()
  title: string;

  @Column()
  description: string;
}