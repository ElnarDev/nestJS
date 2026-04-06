import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDto } from './dto/note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  createAndUpdate(@Body() dto: NoteDto) {
    return this.noteService.createAndUpdate(dto);
  }

  @Get('detail')
  findWithUsers() {
    return this.noteService.findWithUsers();
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.noteService.findByUsuarioId(+usuarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.delete(+id);
  }
}
