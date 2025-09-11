import { Injectable } from '@nestjs/common';
import { StudentInterface } from './interface/student.interface';
import { CreateStudentDto } from './Dtos/create.student.dto';
import { UpdateStudentDto } from './Dtos/update.student.dto';

@Injectable()
export class StudentService {
  private students: StudentInterface[] = [
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Martin',
      dateOfBirth: new Date('2000-03-15'),
      discordWebHook: 'https://discord.com/api/webhooks/1',
      groupeId: 101,
      createdAt: new Date('2023-01-10T10:20:00Z'),
      updatedAt: new Date('2023-05-01T14:45:00Z'),
    },
    {
      id: 2,
      firstName: 'Lucas',
      lastName: 'Durand',
      dateOfBirth: new Date('1999-07-22'),
      groupeId: 102,
      createdAt: new Date('2023-02-05T08:15:00Z'),
      updatedAt: new Date('2023-06-10T12:30:00Z'),
    },
    {
      id: 3,
      firstName: 'Emma',
      lastName: 'Bernard',
      dateOfBirth: new Date('2001-01-30'),
      discordWebHook: 'https://discord.com/api/webhooks/3',
      groupeId: 101,
      createdAt: new Date('2023-03-12T09:00:00Z'),
      updatedAt: new Date('2023-07-02T16:10:00Z'),
    },
    {
      id: 4,
      firstName: 'Hugo',
      lastName: 'Lefevre',
      dateOfBirth: new Date('2000-11-05'),
      groupeId: 103,
      createdAt: new Date('2023-04-01T11:25:00Z'),
      updatedAt: new Date('2023-08-20T18:45:00Z'),
    },
    {
      id: 5,
      firstName: 'Chloé',
      lastName: 'Moreau',
      dateOfBirth: new Date('1998-09-18'),
      discordWebHook: 'https://discord.com/api/webhooks/5',
      groupeId: 104,
      createdAt: new Date('2023-04-20T13:15:00Z'),
      updatedAt: new Date('2023-09-01T09:40:00Z'),
    },
    {
      id: 6,
      firstName: 'Thomas',
      lastName: 'Garcia',
      dateOfBirth: new Date('2002-06-09'),
      groupeId: 102,
      createdAt: new Date('2023-05-15T15:00:00Z'),
      updatedAt: new Date('2023-09-15T17:20:00Z'),
    },
    {
      id: 7,
      firstName: 'Sarah',
      lastName: 'Petit',
      dateOfBirth: new Date('2001-12-25'),
      discordWebHook: 'https://discord.com/api/webhooks/7',
      groupeId: 101,
      createdAt: new Date('2023-06-02T08:50:00Z'),
      updatedAt: new Date('2023-10-05T20:00:00Z'),
    },
    {
      id: 8,
      firstName: 'Antoine',
      lastName: 'Roux',
      dateOfBirth: new Date('1999-04-11'),
      groupeId: 103,
      createdAt: new Date('2023-06-22T10:10:00Z'),
      updatedAt: new Date('2023-10-25T22:30:00Z'),
    },
    {
      id: 9,
      firstName: 'Julie',
      lastName: 'Fontaine',
      dateOfBirth: new Date('2000-10-07'),
      discordWebHook: 'https://discord.com/api/webhooks/9',
      groupeId: 104,
      createdAt: new Date('2023-07-18T09:45:00Z'),
      updatedAt: new Date('2023-11-02T11:15:00Z'),
    },
    {
      id: 10,
      firstName: 'Maxime',
      lastName: 'Chevalier',
      dateOfBirth: new Date('2001-02-14'),
      groupeId: 102,
      createdAt: new Date('2023-08-05T14:00:00Z'),
      updatedAt: new Date('2023-11-20T19:10:00Z'),
    },
  ];
  private index: number = 10;

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

  updateStudent(id: number, body: UpdateStudentDto) {
    const student = this.getStudentById(id);
    const updatedStudent = {
      ...student,
      ...body,
      updatedAt: new Date(),
    };
    return updatedStudent;
  }

  deleteStudent(id: number) {
    const studentToDelete = this.getStudentById(id);
    this.students.filter((student) => student.id != studentToDelete.id);
    return studentToDelete;
  }
}
