import { Injectable } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {
  private persons: PersonDto[] = [];
  private lastId = 0;

  constructor(
    @InjectRepository(Person)
    private personRepo: Repository<Person>,
  ) {}

  async findAll() {
    return await this.personRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(id: number) {
    return await this.personRepo.findOneBy({ id });
  }

  async createAndUpdate(dto: PersonDto) {
    const exists = await this.personRepo.findOneBy({ id: dto.id });

    if (exists) {
      Object.assign(exists, dto);
      return await this.personRepo.save(exists);
    } else {
      const newPerson = this.personRepo.create(dto);
      return await this.personRepo.save(newPerson);
    }
  }

  async delete(id: number) {
    await this.personRepo.delete({ id });
    return { message: `Person with id ${id} removed` };
  }
}
