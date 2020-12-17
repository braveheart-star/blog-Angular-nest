import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { UserType } from '../../utils/enums/userType.enum';

export class RequestDto {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}
