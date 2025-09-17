import { IsNumber, IsString } from 'class-validator';

export class CreateGroupeDto {
  @IsString()
  name: string;
  @IsNumber()
  formationId: number;
  @IsNumber()
  leadId: number;
}
