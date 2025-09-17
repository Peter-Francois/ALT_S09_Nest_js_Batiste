import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { GroupeService } from './groupe.service';
import { CreateGroupeDto } from './dto/create-groupe.dto';
import { UpdateGroupeDto } from './dto/update-groupe.dto';
import type { ResponseInterface } from 'src/utils/interface/response.interface';
import { Groupe } from '@prisma/client';

@Controller('groups')
export class GroupeController {
  constructor(private readonly groupeService: GroupeService) {}

  @Post()
  async create(
    @Body() createGroupeDto: CreateGroupeDto,
  ): Promise<ResponseInterface<Groupe>> {
    try {
      const res: Groupe = await this.groupeService.create(createGroupeDto);
      return {
        data: res,
        message: `La formation ${createGroupeDto.name} a bien était créé`,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get()
  findAll() {
    return this.groupeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupeDto: UpdateGroupeDto) {
    return this.groupeService.update(+id, updateGroupeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupeService.remove(+id);
  }
}
