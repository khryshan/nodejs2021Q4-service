import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Columns } from "./Columns";

@Entity('board')
export class Board extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @OneToMany(
    () => Columns, 
    column => column.board, 
    { onDelete: 'CASCADE' }
  )
  columns!: Columns[];

}
