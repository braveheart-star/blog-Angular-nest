import {
  BaseEntity as OrmBaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class BaseEntity extends OrmBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  // @CreateDateColumn({ type: 'timestamptz' })
  // public createdAt: Date;

  // @UpdateDateColumn({ type: 'timestamptz' })
  // public updatedAt: Date;
}
