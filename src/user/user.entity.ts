import { Entity, Column, OneToMany } from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';
import { BaseEntity } from '../utils/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, unique: true })
  public email: string;

  //For local authentication. It will be removed in the future.
  @Column({ type: 'varchar', nullable: true })
  public password: string;

  @OneToMany((type) => BlogEntity, (blogEntryEntity) => blogEntryEntity.author)
  blogEntries: BlogEntity[];
}
