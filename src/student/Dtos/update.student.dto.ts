import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;
  @IsNotEmpty()
  @IsDate()
  dateOfBirth?: Date;
  @IsNotEmpty()
  @IsNumber()
  groupeId?: number;
}
