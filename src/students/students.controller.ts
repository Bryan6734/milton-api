import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';

// The controller.ts manages API requests and deals with routing links.

// The 'students' controller decorator filters for requests with /students/
@Controller('students')
export class StudentsController {
  // private readonly: We are only ever using ONE service
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async addStudent(
    @Body('first') first: string,
    @Body('last') last: string,
    @Body('res') res: string,
    @Body('year') year: number,
    @Body('adv') adv: string,
    @Body('parents') parents: Array<string>,
    @Body('cells') cells: Array<string>,
    @Body('emails') emails: Array<string>,
  ) {
    console.log('[CONTROLLER] Adding student');
    const generatedId = await this.studentsService.insertStudent(
      first,
      last,
      res,
      year,
      adv,
      parents,
      cells,
      emails,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllStudents() {
    const students = await this.studentsService.getStudents();
    return students;
  }

  @Get(':id')
  getStudent(@Param('id') studentId: string) {
    return this.studentsService.getStudentById(studentId);
  }

  @Get('/firstname/:first')
  getStudentsByFirstName(@Param('first') studentFirstName: string) {
    return this.studentsService.getStudentsByFirstName(studentFirstName);
  }

  @Get('/lastname/:last')
  getStudentsByLastName(@Param('last') studentLastName: string) {
    return this.studentsService.getStudentsByLastName(studentLastName);
  }

  @Get('/advisory/:advisor')
  getStudentsByAdvisor(@Param('advisor') studentAdvisor: string) {
    return this.studentsService.getStudentsByAdvisor(studentAdvisor);
  }

  @Get('/dorm/:dorm')
  getStudentsByDorm(@Param('dorm') studentDorm: string) {
    return this.studentsService.getStudentsByDorm(studentDorm);
  }

  @Patch(':id')
  async updateStudent(
    @Param('id') studentId: string,
    @Body('first') first: string,
    @Body('last') last: string,
    @Body('res') res: string,
    @Body('adv') adv: string,
    @Body('year') year: number,
    @Body('parents') parents: Array<string>,
    @Body('cells') cells: Array<string>,
    @Body('emails') emails: Array<string>,
  ) {
    await this.studentsService.updateStudent(
      studentId,
      first,
      last,
      res,
      year,
      adv,
      parents,
      cells,
      emails,
    );

    return null;
  }

  @Delete(':id')
  async removeStudent(@Param('id') studentId: string) {
    await this.studentsService.deleteStudent(studentId);
    return null;
  }
}
