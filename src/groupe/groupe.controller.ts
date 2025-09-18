import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
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
        message: `Le groupe ${createGroupeDto.name} a était créé`,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get()
  async findAll(): Promise<ResponseInterface<Groupe[] | []>> {
    const res: Groupe[] = await this.groupeService.findAll();
    return {
      data: res,
      message:
        res.length == 0
          ? `Il n'y a pas de groupe dans la liste`
          : `Voici la liste complete des groupes (${res.length} groupe${res.length == 1 ? '' : 's'})`,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseInterface<Groupe | undefined>> {
    try {
      const res: Groupe | undefined = await this.groupeService.findOne(id);
      return { data: res, message: `Voici le groupe demandé(id: ${id})` };
    } catch (error) {
      console.log('🚀 ~ GroupeController ~ findOne ~ res:', error);
      throw new NotFoundException(
        `L'id ${id} n'existe pas dans la liste des groupes`,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupeDto: UpdateGroupeDto,
  ): Promise<ResponseInterface<Groupe | undefined>> {
    const res = await this.groupeService.update(id, updateGroupeDto);
    return {
      data: res,
      message: `Le groupe:${res.name} a été ajoutée à la liste des groupes`,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupeService.remove(+id);
  }
}
