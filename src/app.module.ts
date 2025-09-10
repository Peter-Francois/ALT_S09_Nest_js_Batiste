import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { FormationModule } from './formation/formation.module';

@Module({
  imports: [StudentModule, FormationModule],
})
export class AppModule {}
