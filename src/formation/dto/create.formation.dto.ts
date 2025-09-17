import { IsNumber, IsString } from 'class-validator';

export class CreateFormationDto {
  @IsString()
  name: string;
}
