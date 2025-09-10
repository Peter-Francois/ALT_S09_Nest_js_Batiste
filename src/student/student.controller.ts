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
import { StudentService } from './student.service';
import type { CreateStudentDto } from './Dtos/create.student.dto';
import type { ResponseInterface } from './interface/response.interface';
import type { UpdateStudentDto } from './Dtos/update.student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // * `GET /students` - Récupérer tous les étudiants
  @Get()
  getAll(): ResponseInterface {
    const students = this.studentService.getStudents();
    if (students.length == 0) {
      return { data: {}, message: `Il n'y a pas d'étudiant dans la liste` };
    }
    return {
      data: { students },
      message: `Voici la liste complete des étudiants (${students.length} étudiants)`,
    };
  }

  // * `GET /students/:id` - Récupérer un étudiant par son ID
  @Get(':id')
  getById(@Param('id') id: string): ResponseInterface {
    const student = this.studentService.getStudentById(+id);
    if (!student) {
      throw new NotFoundException(
        `L'id ${id} n'existe pas dans la liste des étudiants`,
      );
    }
    return {
      data: { student },
      message: `Voici l'étudiant demandé(id: ${id})`,
    };
  }

  // * `POST /students` - Créer un nouvel étudiant
  @Post()
  create(@Body() body: CreateStudentDto): ResponseInterface {
    const student = this.studentService.createStudent(body);
    const students = this.studentService.getStudents();
    //throw NotfoundExeption
    return {
      data: { student, students },
      message: `L'étudiant ${student.firstName} a était ajouté à la liste des étudiants`,
    };
  }

  // * `PUT /students/:id` - Mettre à jour un étudiant existant
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateStudentDto,
  ): ResponseInterface {
    const student = this.studentService.updateStudent(+id, body);
    return {
      data: { student },
      message: `L'étudiant ${student.firstName} a était mis à jour`,
    };
  }
  // * `DELETE /students/:id` - Supprimer un étudiant
  @Delete(':id')
  delete(@Param('id') id: string): ResponseInterface {
    const student = this.studentService.deleteStudent(+id);
    const students = this.getAll();
    return {
      data: { students },
      message: `L'étudiant ${student.firstName} a était retiré de la liste des étudiants`,
    };
  }
}
