import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [StudentsModule, MongooseModule.forRoot(
    'mongodb+srv://bryansukidi:Bryan6734@cs3-mongodb.ayxucwf.mongodb.net/test'
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
