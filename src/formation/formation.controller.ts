import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FormationService } from './formation.service';
import type { CreateFormationDto } from './dtos/create.formation.dto';
import type {
  ResponseInterface,
  ResponseInterfaceWithoutData,
} from '../utils/interface/response.interface';
import type { UpdateFormationDto } from './dtos/update.formation.dto';
import { FormationInterface } from './interface/formation.interface';
import { Formation } from '@prisma/client';

@Controller('formations')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  // * `GET /students` - Récupérer tous les étudiants
  @Get()
  async getAll(): Promise<
    ResponseInterface<{
      formations: Formation[] | [];
    }>
  > {
    const formations = await this.formationService.get();

    return {
      data: { formations },
      message:
        formations.length == 0
          ? `Il n'y a pas de formation dans la liste`
          : `Voici la liste complete des formations (${formations.length} formations)`,
    };
  }

  // * `GET /students/:id` - Récupérer un étudiant par son ID
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseInterface<{ formation: Formation | null }>> {
    const formation = await this.formationService.getById(id);
    if (!formation) {
      throw new NotFoundException(
        `L'id ${id} n'existe pas dans la liste des formations`,
      );
    }
    return {
      data: { formation },
      message: `Voici la formation demandé(id: ${id})`,
    };
  }

  // * `POST /students` - Créer un nouvel étudiant
  @Post()
  async create(@Body() body: CreateFormationDto): Promise<
    ResponseInterface<{
      newFormation: Formation;
    }>
  > {
    const newFormation = await this.formationService.create(body);
    return {
      data: { newFormation },
      message: `La formation: "${newFormation.name}" a été ajoutée à la liste des formations`,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFormationDto,
  ): Promise<ResponseInterfaceWithoutData> {
    const updateFormation = await this.formationService.update(id, body);
    if (!updateFormation)
      throw new NotFoundException(
        `L'id ${id} n'existe pas dans la liste des formations`,
      );

    return {
      message: `La formation: "${updateFormation.name}" a été ajoutée à la liste des formations`,
    };
  }
  // // * `PUT /students/:id` - Mettre à jour un étudiant existant
  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() body: UpdateFormationDto,
  // ): ResponseInterface<{ formation: FormationInterface }> {
  //   const formation = this.formationService.updateformation(id, body);
  //   return {
  //     data: { formation },
  //     message: `La formation: "${formation.name}" a était mis à jour`,
  //   };
  // }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseInterfaceWithoutData> {
    const formation = await this.formationService.getById(id);
    if (!formation)
      throw new NotFoundException(
        `L'id ${id} n'existe pas dans la liste des formations`,
      );

    await this.formationService.delete(id);
    return {
      message: `La formation a était retiré de la liste des formations`,
    };
  }
  // // * `DELETE /students/:id` - Supprimer un étudiant
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number): ResponseInterface<null> {
  //   const formation = this.formationService.deleteformation(id);
  //   return {
  //     data: null,
  //     message: `L'étudiant ${formation.name} a était retiré de la liste des étudiants`,
  //   };
  // }
}
