import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
