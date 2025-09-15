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
import type { CreateFormationDto } from './Dtos/create.formation.dto';
import type { ResponseInterface } from '../utils/interface/response.interface';
import type { UpdateFormationDto } from './Dtos/update.formation.dto';
import { FormationInterface } from './interface/formation.interface';

@Controller('formations')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  // * `GET /students` - Récupérer tous les étudiants
  @Get()
  async getAll(): Promise<
    ResponseInterface<{
      formations: FormationInterface[] | [];
    }>
  > {
    const formations = await this.formationService.getformations();
    if (formations.length == 0) {
      return {
        data: { formations },
        message: `Il n'y a pas de formation dans la liste`,
      };
    }
    return {
      data: { formations },
      message: `Voici la liste complete des formations (${formations.length} formations)`,
    };
  }

  // * `GET /students/:id` - Récupérer un étudiant par son ID
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseInterface<{ formation: FormationInterface | null }>> {
    const formation = await this.formationService.getformationById(id);
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
      newFormation: FormationInterface;
    }>
  > {
    const newFormation = await this.formationService.createformation(body);
    return {
      data: { newFormation },
      message: `La formation: "${newFormation.name}" a était ajouté à la liste des formations`,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFormationDto,
  ): Promise<ResponseInterface<{ formation: FormationInterface }>> {
    const updateFormation = await this.formationService.updateformation(
      id,
      body,
    );
    return {
      message: `La formation: "${updateFormation.name}" a était ajouté à la liste des formations`,
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
  ): Promise<ResponseInterface<{ formation: FormationInterface }>> {
    await this.formationService.deleteformation(id);
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
