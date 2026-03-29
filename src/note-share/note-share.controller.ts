import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NoteShareService } from './note-share.service';
import { NoteShareDto } from './dto/note-share.dto';

@Controller('note-share')
export class NoteShareController {
  constructor(private readonly noteShareService: NoteShareService) {}

  @Post()
  createOrUpdate(@Body() dto: NoteShareDto) {
    return this.noteShareService.createOrUpdate(dto);
  }

  @Get()
  findAll() {
    return this.noteShareService.findAll();
  }

  @Get('nota/:notaId')
  findByNota(@Param('notaId') notaId: string) {
    return this.noteShareService.findByNota(+notaId);
  }

  @Get('person/:personId')
  findByPerson(@Param('personId') personId: string) {
    return this.noteShareService.findByPerson(+personId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteShareService.delete(+id);
  }
}
