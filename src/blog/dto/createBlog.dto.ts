import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // @IsNotEmpty()
  // @IsString()
  // headerImage: string;
}
