import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentInterface } from './interface/student.interface';
import type { CreateStudentDto } from './Dtos/create.student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // * `GET /students` - Récupérer tous les étudiants
  @Get()
  getAll(): StudentInterface[] | [] {
    const students = this.studentService.getStudents();
    return students;
  }
  // * `GET /students/:id` - Récupérer un étudiant par son ID
  @Get(':id')
  getById(@Param('id') id: string): StudentInterface | [] {
    const student = this.studentService.getStudentById(+id);
    return student;
  }
  // * `POST /students` - Créer un nouvel étudiant
  @Post()
  create(@Body() body: CreateStudentDto) {
    const student = this.studentService.createStudent(body);
    const students = this.studentService.getStudents();
    return {
      data: { student, students },
      message: `L'étudiant ${student.firstName} a était ajouté à la liste des étudiants`,
    };
  }
  // * `PUT /students/:id` - Mettre à jour un étudiant existant
  // * `DELETE /students/:id` - Supprimer un étudiant
}
