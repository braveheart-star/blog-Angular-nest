import {
  Get,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  Body,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetUser } from '../utils/decorators/getUser.decorator';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get('me')
  async getCurrentUser(@GetUser('email') email: string) {
    return this.userService.getUserDetailByEmail(email);
  }

}



