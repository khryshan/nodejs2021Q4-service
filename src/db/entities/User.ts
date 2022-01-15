import { BaseEntity, Column, Entity,  PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: 'varchar', length: 50 })
  login?: string;

  @Column({ type: 'varchar', length: 50 })
  name?: string;

  @Column({ type: 'varchar', length: 16 })
  password?: string;
}

