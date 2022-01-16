import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Board } from "./Boards";

@Entity({ name: 'column' })
export class Columns extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @Column('int')
  order!: number;

  @ManyToOne(
    () => Board,
    board => board.columns,
    {onDelete: 'CASCADE'}
  )
  boardId!: string;
}
