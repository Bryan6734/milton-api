import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./student.model";
import { StudentsController } from "./students.controller"
import { StudentsService } from "./students.service"

// app module needs products module, so must import this to app module

@Module({
  imports: [MongooseModule.forFeature([{name: 'Student', schema: StudentSchema}])], // allows us to inject file into any file that needs it
  controllers: [StudentsController],
  providers: [StudentsService]
})

export class StudentsModule{}
