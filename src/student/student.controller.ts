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
import { StudentService } from './student.service';
import type { CreateStudentDto } from './Dtos/create.student.dto';
import type { ResponseInterface } from '../utils/interface/response.interface';
import type { UpdateStudentDto } from './Dtos/update.student.dto';
import { StudentInterface } from './interface/student.interface';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // * `GET /students` - Récupérer tous les étudiants
  @Get()
  getAll(): ResponseInterface<{ students: StudentInterface[] }> {
    const students = this.studentService.getStudents();
    if (students.length == 0) {
      return {
        data: { students },
        message: `Il n'y a pas d'étudiant dans la liste`,
      };
    }
    return {
      data: { students },
      message: `Voici la liste complete des étudiants (${students.length} étudiants)`,
    };
  }

  // * `GET /students/:id` - Récupérer un étudiant par son ID
  @Get(':id')
  getById(
    @Param('id', ParseIntPipe) id: number,
  ): ResponseInterface<{ student: StudentInterface }> {
    console.log(typeof id);
    const student = this.studentService.getStudentById(id);
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
  create(@Body() body: CreateStudentDto): ResponseInterface<{
    student: StudentInterface;
    students: StudentInterface[];
  }> {
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
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStudentDto,
  ): ResponseInterface<{ student: StudentInterface }> {
    const student = this.studentService.updateStudent(id, body);
    return {
      data: { student },
      message: `L'étudiant ${student.firstName} a était mis à jour`,
    };
  }
  // * `DELETE /students/:id` - Supprimer un étudiant
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): ResponseInterface<null> {
    const student = this.studentService.deleteStudent(id);
    return {
      data: null,
      message: `L'étudiant ${student.firstName} a était retiré de la liste des étudiants`,
    };
  }
}
