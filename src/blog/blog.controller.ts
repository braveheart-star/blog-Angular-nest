import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../user/user.entity';

import { GetUser } from '../utils/decorators/getUser.decorator';
import { BlogEntity } from './blog.entity';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/createBlog.dto';
import { UpdateBlogDto } from './dto/updateBlog.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllBlogs(): Promise<BlogEntity[]> {
    return this.blogService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/user')
  async getCurrentUserBlog(@GetUser() user: UserEntity): Promise<BlogEntity[]> {
    console.log('here get', user);
    return this.blogService.getAllByUserEmail(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async createBlog(
    @GetUser('email') email: string,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<BlogEntity> {
    console.log('here create', createBlogDto, email);
    return await this.blogService.createBlogByUserEmail(createBlogDto, email);
  }

  @Put()
  async updateBlog(@Body() updateBlogDto: UpdateBlogDto): Promise<any> {
    return this.blogService.updateBlog(updateBlogDto);
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseIntPipe) id): Promise<any> {
    return this.blogService.deleteBlog(id);
  }
}
