import { Injectable } from '@nestjs/common';
import { StudentInterface } from './interface/student.interface';
import { CreateStudentDto } from './Dtos/create.student.dto';

@Injectable()
export class StudentService {
  private students: StudentInterface[] = [];
  private index: number = 0;

  getStudents(): StudentInterface[] | [] {
    return this.students;
  }

  getStudentById(id: number): StudentInterface | null {
    return this.students.find((student) => student.id == id);
  }

  createStudent(body: CreateStudentDto) {
    this.index++;
    const student = {
      ...body,
      id: this.index,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.students.push(student);
    return student;
  }
}
