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

  @Column({ type: 'varchar', length: 36, nullable: true })
  userId!: string | null;

  @Column({ type: 'varchar', length: 36, nullable: true })
  boardId!: string | null;

  @Column({ type: 'varchar', length: 36, nullable: true })
  columnId!: string | null;
}
