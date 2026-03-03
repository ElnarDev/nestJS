import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';

@Module({
  imports: [PersonModule],
  controllers: [AppController, PersonController],
  providers: [AppService, PersonService],
})
export class AppModule {}
