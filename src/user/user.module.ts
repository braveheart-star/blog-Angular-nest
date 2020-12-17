import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from 'typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BaseEntity,],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService]
})
export class UserModule { }
