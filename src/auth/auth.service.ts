import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserEntity } from '../user/user.entity';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }


  // signup user
  public async registerWithLocal(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === '23505') {
        throw new BadRequestException(
          'User with that email or that nick name already exists',
        );
      }
      throw new BadGatewayException();
    }
  }


  public getWithJwtToken(user: UserEntity) {
    const payload = {
      sub: user.id,
      // type: user.type,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const user = await this.userService.getByEmail(email);
    await this.verifyPassword(plainTextPassword, user.password);
    user.password = undefined;
    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong Credentials Provided');
    }
  }

}
