import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NoteShare } from '../note-share/entities/note-share.entity';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note, NoteShare])],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
