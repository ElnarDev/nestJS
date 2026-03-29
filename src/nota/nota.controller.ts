import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaDto } from './dto/nota.dto';

@Controller('nota')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  @Post()
  createAndUpdate(@Body() dto: NotaDto) {
    return this.notaService.createAndUpdate(dto);
  }

  @Get('detail')
  findWithUsers() {
    return this.notaService.findWithUsers();
  }

  @Get()
  findAll() {
    return this.notaService.findAll();
  }

  @Get('person/:personId')
  findByPerson(@Param('personId') personId: string) {
    return this.notaService.findByPersonId(+personId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notaService.findById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notaService.delete(+id);
  }
}
