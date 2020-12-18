import {
  Get,
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Delete,
  UseInterceptors,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../utils/decorators/getUser.decorator';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserEntity } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerWithLocal(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    console.log('from front credentional', createUserDto);
    return this.authService.registerWithLocal(createUserDto);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async logIn(@GetUser() user): Promise<any> {
    return this.authService.getWithJwtToken(user);
  }
}
