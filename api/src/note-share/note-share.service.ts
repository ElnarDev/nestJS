import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteShare } from './entities/note-share.entity';
import { Note } from '../note/entities/note.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { NoteShareDto } from './dto/note-share.dto';

@Injectable()
export class NoteShareService {
  constructor(
    @InjectRepository(NoteShare)
    private noteShareRepo: Repository<NoteShare>,
  ) {}

  async findAll() {
    return await this.noteShareRepo.find({
      relations: ['note', 'usuario'],
      order: { id: 'ASC' },
    });
  }

  async findByNota(notaId: number) {
    return await this.noteShareRepo.find({
      where: { note_id: notaId },
      relations: ['note', 'usuario'],
      order: { id: 'ASC' },
    });
  }

  async findByPerson(personId: number) {
    return await this.noteShareRepo.find({
      where: { usuario_id: personId },
      relations: ['note', 'usuario'],
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
      note: { id: dto.note_id } as Note,
      usuario: { id: dto.usuario_id } as Usuario,
      note_id: dto.note_id,
      usuario_id: dto.usuario_id,
    });
    return await this.noteShareRepo.save(newShare);
  }

  async delete(id: number) {
    const share = await this.findById(id);
    if (!share) {
      throw new NotFoundException(`NoteShare with id ${id} not found`);
    }
    await this.noteShareRepo.delete({ id });
    return { message: `NoteShare with id ${id} removed` };
  }

  async findById(id: number) {
    const data = await this.noteShareRepo.findOne({
      where: { id },
      relations: ['note', 'usuario'],
      select: {
        id: true,
        role: true,
        note: {
          id: true,
          title: true,
        },
        usuario: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return data;
  }
}
