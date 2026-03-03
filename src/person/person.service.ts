import { Injectable } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';

@Injectable()
export class PersonService {
  private persons: PersonDto[] = [];
  private lastId = 0;

  createAndUpdate(personDto: PersonDto) {
    const exists = this.persons.some((person) => person.id === personDto.id);
    if (exists) {
      this.persons = this.persons.map((person) =>
        person.id === personDto.id ? { ...person, ...personDto } : person,
      );
      return this.persons.find((person) => person.id === personDto.id);
    } else {
      const newPerson: PersonDto = {
        ...personDto,
        id: ++this.lastId,
      };
      this.persons.push(newPerson);
      return newPerson;
    }
  }

  findAll() {
    return this.persons;
  }

  findOne(id: number) {
    return this.persons.find((person) => person.id === id);
  }

  remove(id: number) {
    this.persons = this.persons.filter((person) => person.id !== id);
    return { message: `Person with id ${id} removed` };
  }
}
