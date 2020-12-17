import { IsString, IsOptional } from 'class-validator';

export class RequestUserDto {

  @IsOptional()
  @IsString()
  email: string;
}

