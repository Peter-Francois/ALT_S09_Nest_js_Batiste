import { Injectable } from '@nestjs/common';
import { CreateGroupeDto } from './dto/create-groupe.dto';
import { UpdateGroupeDto } from './dto/update-groupe.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Groupe } from '@prisma/client';

@Injectable()
export class GroupeService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateGroupeDto): Promise<Groupe> {
    const { name, leadId, formationId } = data;
    const res = await this.prisma.groupe.create({
      data: {
        name,
        lead: {
          connect: { id: leadId },
        },
        formation: {
          connect: { id: formationId },
        },
      },
      include: { formation: true },
    });

    return res;

    //include: {formation: {select: {name: true}}}
    // formation:{create: {name: formations}}
  }

  async findAll(): Promise<Groupe[] | []> {
    return await this.prisma.groupe.findMany({});
  }

  async findOne(id: number): Promise<Groupe | undefined> {
    return await this.prisma.groupe.findUnique({
      where: { id },
      // include: { student: { omit: { id: true, lastName: true } } },
    });
  }

  async update(
    id: number,
    updateGroupeDto: UpdateGroupeDto,
  ): Promise<Groupe | undefined> {
    const { formationId, leadId, name } = updateGroupeDto;

    return await this.prisma.groupe.update({
      where: { id },
      data: {
        name,
        formationId,
        leadId,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} groupe`;
  }
}
