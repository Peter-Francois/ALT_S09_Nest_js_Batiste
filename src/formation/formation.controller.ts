import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FormationService } from './formation.service';
import type { CreateFormationDto } from './Dtos/create.formation.dto';
import type { ResponseInterface } from './interface/response.interface';
import type { UpdateFormationDto } from './Dtos/update.formation.dto';

@Controller('formations')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  // * `GET /students` - Récupérer tous les étudiants
  @Get()
  getAll(): ResponseInterface {
    const formation = this.formationService.getformations();
    if (formation.length == 0) {
      return { data: {}, message: `Il n'y a pas de formation dans la liste` };
    }
    return {
      data: { formation },
      message: `Voici la liste complete des formations (${formation.length} formations)`,
    };
  }

  // * `GET /students/:id` - Récupérer un étudiant par son ID
  @Get(':id')
  getById(@Param('id') id: string): ResponseInterface {
    const formation = this.formationService.getformationById(+id);
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
  create(@Body() body: CreateFormationDto): ResponseInterface {
    const formation = this.formationService.createformation(body);
    const formations = this.formationService.getformations();
    //throw NotfoundExeption
    return {
      data: { formation, formations },
      message: `La formation: "${formation.name}" a était ajouté à la liste des formations`,
    };
  }

  // * `PUT /students/:id` - Mettre à jour un étudiant existant
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateFormationDto,
  ): ResponseInterface {
    const formation = this.formationService.updateformation(+id, body);
    return {
      data: { formation },
      message: `La formation: "${formation.name}" a était mis à jour`,
    };
  }
  // * `DELETE /students/:id` - Supprimer un étudiant
  @Delete(':id')
  delete(@Param('id') id: string): ResponseInterface {
    const formation = this.formationService.deleteformation(+id);
    const formations = this.getAll();
    return {
      data: { formations },
      message: `L'étudiant ${formation.name} a était retiré de la liste des étudiants`,
    };
  }
}
