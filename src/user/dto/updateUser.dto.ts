import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    profileImage: any;
}

export default UpdateUserDto;
