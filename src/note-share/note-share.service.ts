import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteShare } from './entities/note-share.entity';
import { Nota } from '../nota/entities/nota.entity';
import { Person } from '../person/entities/person.entity';
import { NoteShareDto } from './dto/note-share.dto';

@Injectable()
export class NoteShareService {
  constructor(
    @InjectRepository(NoteShare)
    private noteShareRepo: Repository<NoteShare>,
  ) {}

  async findAll() {
    return await this.noteShareRepo.find({
      relations: ['nota', 'person'],
      order: { id: 'ASC' },
    });
  }

  async findByNota(notaId: number) {
    return await this.noteShareRepo.find({
      where: { note_id: notaId },
      relations: ['nota', 'person'],
      order: { id: 'ASC' },
    });
  }

  async findByPerson(personId: number) {
    return await this.noteShareRepo.find({
      where: { usuario_id: personId },
      relations: ['nota', 'person'],
      order: { id: 'ASC' },
    });
  }

  async createOrUpdate(dto: NoteShareDto) {
    const existing = await this.noteShareRepo.findOne({
      where: { note_id: dto.note_id, usuario_id: dto.usuario_id },
    });

    if (existing) {
      existing.role = dto.role;
      return await this.noteShareRepo.save(existing);
    }

    const newShare = this.noteShareRepo.create({
      role: dto.role,
      nota: { id: dto.note_id } as Nota,
      person: { id: dto.usuario_id } as Person,
      note_id: dto.note_id,
      usuario_id: dto.usuario_id,
    });
    return await this.noteShareRepo.save(newShare);
  }

  async delete(id: number) {
    const share = await this.noteShareRepo.findOneBy({ id });
    if (!share) {
      throw new NotFoundException(`NoteShare with id ${id} not found`);
    }
    await this.noteShareRepo.delete({ id });
    return { message: `NoteShare with id ${id} removed` };
  }
}
