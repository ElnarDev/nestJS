import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { NoteShare } from '../note-share/entities/note-share.entity';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Nota, NoteShare])],
  providers: [NotaService],
  controllers: [NotaController],
})
export class NotaModule {}
