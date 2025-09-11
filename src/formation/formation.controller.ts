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
  getAll(): ResponseInterface<{ formations: FormationInterface[] | [] }> {
    const formations = this.formationService.getformations();
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
  getById(
    @Param('id', ParseIntPipe) id: number,
  ): ResponseInterface<{ formation: FormationInterface | null }> {
    const formation = this.formationService.getformationById(id);
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
  create(@Body() body: CreateFormationDto): ResponseInterface<{
    formation: FormationInterface;
  }> {
    const formation = this.formationService.createformation(body);
    return {
      data: { formation },
      message: `La formation: "${formation.name}" a était ajouté à la liste des formations`,
    };
  }

  // * `PUT /students/:id` - Mettre à jour un étudiant existant
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFormationDto,
  ): ResponseInterface<{ formation: FormationInterface }> {
    const formation = this.formationService.updateformation(id, body);
    return {
      data: { formation },
      message: `La formation: "${formation.name}" a était mis à jour`,
    };
  }
  // * `DELETE /students/:id` - Supprimer un étudiant
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): ResponseInterface<null> {
    const formation = this.formationService.deleteformation(id);
    return {
      data: null,
      message: `L'étudiant ${formation.name} a était retiré de la liste des étudiants`,
    };
  }
}
