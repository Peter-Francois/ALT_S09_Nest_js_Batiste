import { Injectable } from '@nestjs/common';
import { CreateGroupeDto } from './dto/create-groupe.dto';
import { UpdateGroupeDto } from './dto/update-groupe.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GroupeService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateGroupeDto) {
    const { name, leadId, formationId } = data;
    try {
      const res = this.prisma.groupe.create({
        data: {
          name,
          lead: {
            connectOrCreate: {
              create: { firstName: 'to be', lastName: 'to be' },
              where: { id: leadId },
            },
          },
          formation: {
            connectOrCreate: {
              create: { name },
              where: { id: formationId },
            },
          },
        },
      });
      return res;
    } catch (error) {
      throw new Error(
        'Erreur lors de la création du groupe : ' + error.message,
      );
    }
    //include: {formation: {select: {name: true}}}
    // formation:{create: {name: formations}}
  }

  findAll() {
    return `This action returns all groupe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupe`;
  }

  update(id: number, updateGroupeDto: UpdateGroupeDto) {
    return `This action updates a #${id} groupe`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupe`;
  }
}
