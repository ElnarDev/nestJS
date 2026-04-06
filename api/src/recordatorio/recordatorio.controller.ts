import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RecordatorioService } from './recordatorio.service';
import { RecordatorioDto } from './dto/recordatorio.dto';

@Controller('recordatorio')
export class RecordatorioController {
  constructor(private readonly recordatorioService: RecordatorioService) {}

  @Post()
  create(@Body() dto: RecordatorioDto) {
    return this.recordatorioService.create(dto);
  }

  @Get()
  findAll() {
    return this.recordatorioService.findAll();
  }

  @Get('note/:noteId')
  findByNote(@Param('noteId') noteId: string) {
    return this.recordatorioService.findByNoteId(+noteId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordatorioService.findById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordatorioService.delete(+id);
  }
}
