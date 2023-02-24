import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student, StudentSchema } from "./student.model";

// The purpose of the service.ts file is to manage the behind-the-scenes CRUD functionality.
// For example: inserting new products, deleting new products, etc.

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>
  ){}

  async insertStudent(first: string, last: string, res: string, year: number, adv: string, parents: Array<string>, cells: Array<string>, emails: Array<string>){
    const newStudent = new this.studentModel({
      first: first,
      last: last,
      res: res,
      year: year,
      adv: adv,
      parents: parents,
      cells: cells,
      emails: emails
    })

    // newStudent.save() is a method provided by Mongoose
    // Creates a new MongoDB query and returns a promise; await waits until we get a value
    const result = await newStudent.save();
    return result.id as string;
  }

  async getStudents(){
    // .find() will retreive a document (or documents) of all students
    // .exec() will execute the query
    const students = await this.studentModel.find().exec();

    // Returns a list representation of the students from the studentModel document.
    return students.map((student => ({
      id: student.id,
      first: student.first,
      last: student.last,
      res: student.res,
      year: student.year,
      adv: student.adv,
      parents: student.parents,
      cells: student.cells,
      emails: student.emails
    })));
  }

  async getStudentById(studentId: string){
    const student = await this.findStudent(studentId);

    

    return {
      id: student.id,
      first: student.first,
      last: student.last,
      res: student.res,
      year: student.year,
      adv: student.adv,
      parents: student.parents,
      cells: student.cells,
      emails: student.emails
    }

  }

  async updateStudent(
    studentId: string,
    first: string,
    last: string,
    res: string,
    year: number,
    adv: string,
    parents: Array<string>,
    cells: Array<string>,
    emails: Array<string>
  ){
    const updatedStudent = await this.findStudent(studentId)
    
    if (first) {
      updatedStudent.first = first;
    }

    if (last) {
      updatedStudent.last = last;
    }
    if (res) {
      updatedStudent.res = res;
    }

    if (year) {
      updatedStudent.year = year;
    }
    if (adv) {
      updatedStudent.adv = adv;
    }

    if (parents) {
      updatedStudent.parents = parents;
    }
    if (cells) {
      updatedStudent.cells = cells;
    }

    if (emails) {
      updatedStudent.emails = emails;
    }
  }

  async getStudentByFirstName(firstName: string): Promise<Student[]> {

    let student = await this.studentModel.find({"first": {$regex : firstName}});
    return student;

  }

  async getStudentByLastName(lastName: string) {

    let student = await this.studentModel.find({"last": {$regex : lastName}});
    return student;
    
  }

  async deleteStudent(studentId: string) {
    const student = await this.studentModel.deleteOne({_id: studentId}).exec();
    if (student.deletedCount === 0) {
      throw new NotFoundException('Could not find student.');
    }
  }


  private async findStudent(id: string): Promise<Student> {
    let student;

    try {
      student = await this.studentModel.findById(id);
    } catch (error) {
      throw new NotFoundException("Could not find student.")
    }

    if (!student){
      throw new NotFoundException("Could not find student.")
    }

    return student; 
  }



}