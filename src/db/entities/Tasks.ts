import { BaseEntity, Column, Entity,  PrimaryGeneratedColumn} from "typeorm";

@Entity('task')
export class Task extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @Column({ type: 'int' })
  order!: number;

  @Column({ type: 'varchar', length: 200 })
  description!: string;

  @Column({ type: 'varchar', length: 36 })
  userId!: string;

  @Column({ type: 'varchar', length: 36 })
  boardId!: string;

  @Column({ type: 'varchar', length: 36 })
  columnId!: string;
}
