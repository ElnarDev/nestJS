import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { NotaModule } from './nota/nota.module';
import { NoteShareModule } from './note-share/note-share.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PersonModule,
    NotaModule,
    NoteShareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
