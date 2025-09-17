import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFormationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
