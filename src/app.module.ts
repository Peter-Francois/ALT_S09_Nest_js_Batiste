import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { FormationModule } from './formation/formation.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [StudentModule, FormationModule, PrismaModule],
})
export class AppModule {}
