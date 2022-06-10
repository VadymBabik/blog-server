import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDateColumn: Date;

  @UpdateDateColumn()
  updateDateColumn: Date;

  @DeleteDateColumn({ nullable: true })
  deleteDateColumn: Date;
}
