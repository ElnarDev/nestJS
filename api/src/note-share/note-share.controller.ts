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

  @Get('note/:noteId')
  findByNota(@Param('noteId') noteId: string) {
    return this.noteShareService.findByNota(+noteId);
  }

  @Get('usuario/:usuarioId')
  findByPerson(@Param('usuarioId') usuarioId: string) {
    return this.noteShareService.findByPerson(+usuarioId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteShareService.delete(+id);
  }
}
