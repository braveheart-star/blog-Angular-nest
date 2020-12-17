import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/createBlog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UpdateBlogDto } from './dto/updateBlog.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    private userService: UserService,
  ) {}

  async getAll() {
    const blogs = await this.blogRepository.find();
    return blogs;
  }

  async createBlogByUserEmail(createCommentDto: CreateBlogDto, email: string) {
    const user = await this.userService.getByEmail(email);
    return await this.createBlog(createCommentDto, user.id);
  }

  async createBlog(createCommentDto: CreateBlogDto, userId: number) {
    const author = { id: userId };
    const createBlog = this.blogRepository.create({
      ...createCommentDto,
      author,
    });

    const createdData = await createBlog.save();
    return createdData;
  }

  async getAllByUserEmail(user: UserEntity) {
    const blogs = await this.blogRepository.find({
      where: { author: user },
      relations: ['author'],
    });
    return blogs;
  }

  async updateBlog(updateBlogDto: UpdateBlogDto) {
    const { id, title, description } = updateBlogDto;
    const updateBlog = await this.blogRepository.findOne(id);
    if (!updateBlog) {
      throw new NotFoundException(`Comment Not Found With Id: ${id}`);
    }
    try {
      const updatedResponse = await this.blogRepository.update(id, {
        title,
        description,
      });
      return updatedResponse.affected;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteBlog(id: number) {
    const deleteBlog = await this.blogRepository.findOne(id);
    if (!deleteBlog) {
      throw new NotFoundException(`Comment Not Found With Id: ${id}`);
    }
    return await deleteBlog.remove();
  }
}
