import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { StudentsService } from "./students.service";

// The controller.ts manages API requests and deals with routing links. 

// The 'students' controller decorator filters for requests with /students/
@Controller('students')
export class StudentsController {

  // private readonly: We are only ever using ONE service
  constructor(private readonly studentsService: StudentsService){}

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

    console.log("[CONTROLLER] Adding student")
    const generatedId = await this.studentsService.insertStudent(first, last, res, year, adv, parents, cells, emails);
    return { id: generatedId };

  }

  @Get()
  async getAllStudents(){
    const students = await this.studentsService.getStudents();
    return students; 
  }
  
  @Get(':id')
  getStudent(@Param('id') studentId: string){
    return this.studentsService.getStudentById(studentId);
  }

  @Get('/firstname/:first')
  getStudentByFirstName(@Param('first') studentFirstName: string){
    // example query: 
    return this.studentsService.getStudentByFirstName(studentFirstName);
  }

  @Get('/lastname/:last')
  getStudentByLastName(@Param('last') studentLastName: string){
    return this.studentsService.getStudentByLastName(studentLastName);
  }
  

  @Patch(':id')
  async updateStudent(
    @Param('id') studentId: string,
    @Param('first') first: string,
    @Param('last') last: string,
    @Param('res') res: string,
    @Param('year') year: number,
    @Param('adv') adv: string,
    @Param('parents') parents: Array<string>,
    @Param('cells') cells: Array<string>,
    @Param('emails') emails: Array<string>,
  ){
    await this.studentsService.updateStudent(studentId, first, last, res, year, adv, parents, cells, emails);
  }

  @Delete(':id')
  async removeStudent(@Param('id') studentId: string) {
      await this.studentsService.deleteStudent(studentId);
      return null;
  }
  
}