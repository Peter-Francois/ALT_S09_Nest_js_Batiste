import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { FormationModule } from './formation/formation.module';
import { PrismaModule } from 'prisma/prisma.module';
import { TeamMemberModule } from './team-member/team-member.module';
import { GroupeModule } from './groupe/groupe.module';

@Module({
  imports: [
    StudentModule,
    FormationModule,
    PrismaModule,
    TeamMemberModule,
    GroupeModule,
  ],
})
export class AppModule {}
