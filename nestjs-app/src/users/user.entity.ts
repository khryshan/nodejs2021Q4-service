import { BaseEntity, Column, Entity,  PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  login!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100 })
  password!: string;
}

