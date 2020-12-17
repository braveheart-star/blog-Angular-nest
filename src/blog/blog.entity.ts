import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../utils/base.entity';

@Entity('blog_entry')
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  headerImage: string;

  @ManyToOne((type) => UserEntity, (user) => user.blogEntries)
  author: UserEntity;
}
