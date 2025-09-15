import { Injectable } from '@nestjs/common';
import { FormationInterface } from './interface/formation.interface';
import { CreateFormationDto } from './Dtos/create.formation.dto';
import { UpdateFormationDto } from './Dtos/update.formation.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FormationService {
  constructor(private readonly prisma: PrismaService) {}

  private formations: FormationInterface[] = [
    {
      id: 1,
      name: 'Introduction à TypeScript',
      createdAt: new Date('2024-01-15T10:00:00Z'),
      updatedAt: new Date('2024-02-01T15:30:00Z'),
    },
    {
      id: 2,
      name: 'Développement Web avec React',
      createdAt: new Date('2024-02-10T09:00:00Z'),
      updatedAt: new Date('2024-02-20T17:45:00Z'),
    },
    {
      id: 3,
      name: 'Bases de données avec PostgreSQL',
      createdAt: new Date('2024-03-05T11:20:00Z'),
      updatedAt: new Date('2024-03-15T14:10:00Z'),
    },
    {
      id: 4,
      name: 'API REST avec Node.js & Express',
      createdAt: new Date('2024-04-01T08:45:00Z'),
      updatedAt: new Date('2024-04-12T18:00:00Z'),
    },
    {
      id: 5,
      name: 'DevOps & CI/CD avec Docker et GitHub Actions',
      createdAt: new Date('2024-05-20T13:15:00Z'),
      updatedAt: new Date('2024-06-01T09:30:00Z'),
    },
  ];
  private index: number = this.formations.length;

  getformations(): Promise<FormationInterface[] | []> {
    return this.prisma.formation.findMany({});
  }

  getformationById(id: number): Promise<FormationInterface | undefined> {
    return this.prisma.formation.findUnique({ where: { id: id } });
  }

  createformation(body: CreateFormationDto): FormationInterface {
    this.index++;
    const formation = {
      ...body,
      id: this.index,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.formations.push(formation);
    return formation;
  }

  // updateformation(id: number, body: UpdateFormationDto): FormationInterface {
  //   const formation = this.getformationById(id);
  //   const updatedStudent = {
  //     ...formation,
  //     name: body.name,
  //     updatedAt: new Date(),
  //   };
  //   return updatedStudent;
  // }

  // deleteformation(id: number): FormationInterface {
  //   const formationToDelete = this.getformationById(id);
  //   this.formations.filter((student) => student.id != formationToDelete.id);
  //   return formationToDelete;
  // }
}
