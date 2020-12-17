import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from '@nestjs/common';

import { GetUser } from '../utils/decorators/getUser.decorator';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  async getCurrentUser(@GetUser('email') email: string) {
    return this.userService.getUserDetailByEmail(email);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', storage))
  // uploadFile(
  //   @UploadedFile() file,
  //   @GetUser() user: UserEntity,
  // ): Promise<Object> {
  //   return this.userService.updateUser(user, dto);
  // }
}
