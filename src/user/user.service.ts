import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';


import * as dotenv from 'dotenv';

dotenv.config();


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new NotFoundException(`User with email: ${email} does not exist`);
  }


  async getUserDetailByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['notifications', 'ideas', 'settings', 'wallet', 'followers'],
    });
    if (!user) {
      throw new NotFoundException(`User With Email: ${email}Not Found`);
    }
    return user;
  }

}
