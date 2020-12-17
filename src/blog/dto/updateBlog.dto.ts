import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateBlogDto {

  @IsNotEmpty()
  @IsInt()
  id: number;


  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

}
