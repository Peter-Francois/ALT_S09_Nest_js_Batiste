import { Injectable } from '@nestjs/common';
import { CreateGroupeDto } from './dto/create-groupe.dto';
import { UpdateGroupeDto } from './dto/update-groupe.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GroupeService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateGroupeDto) {
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
    console.log('🚀 ~ GroupeService ~ create ~ res:', res);

    return res;

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
