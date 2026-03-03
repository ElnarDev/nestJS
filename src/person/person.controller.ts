import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonDto } from './dto/person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  createAndUpdate(@Body() personDto: PersonDto) {
    return this.personService.createAndUpdate(personDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
