import { IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  name: string;
}
