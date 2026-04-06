import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteShare } from './entities/note-share.entity';
import { NoteShareService } from './note-share.service';
import { NoteShareController } from './note-share.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NoteShare])],
  providers: [NoteShareService],
  controllers: [NoteShareController],
  exports: [NoteShareService],
})
export class NoteShareModule {}
