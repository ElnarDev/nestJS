import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { NoteShare } from '../note-share/entities/note-share.entity';
import { NoteShareRole } from '../note-share/enums/note-share-role.enum';
import { NoteDto } from './dto/note.dto';
import { NoteShareRow, NoteWithUsers } from './interfaces/note.interfaces';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
    @InjectRepository(NoteShare)
    private noteShareRepo: Repository<NoteShare>,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    return await this.noteRepo.find({
      order: { id: 'ASC' },
    });
  }

  async findById(id: number) {
    return await this.noteRepo.findOneBy({ id });
  }

  async findByUsuarioId(usuarioId: number) {
    return await this.dataSource
      .createQueryBuilder()
      .select('n.id', 'note_id')
      .addSelect('n.title', 'note_title')
      .addSelect('p.id', 'usuario_id')
      .addSelect('p.name', 'usuario_name')
      .addSelect('ns.role', 'role')
      .from('note_share', 'ns')
      .innerJoin('usuario', 'p', 'ns.usuario_id = p.id')
      .innerJoin('note', 'n', 'ns.note_id = n.id')
      .where('p.id = :usuarioId', { usuarioId })
      .orderBy('n.id', 'ASC')
      .getRawMany<NoteShareRow>();
  }

  async findWithUsers(): Promise<NoteWithUsers[]> {
    const rows = await this.dataSource
      .createQueryBuilder()
      .select('n.id', 'note_id')
      .addSelect('n.title', 'note_title')
      .addSelect('p.id', 'usuario_id')
      .addSelect('p.name', 'usuario_name')
      .addSelect('ns.role', 'role')
      .from('note_share', 'ns')
      .innerJoin('usuario', 'p', 'ns.usuario_id = p.id')
      .innerJoin('note', 'n', 'ns.note_id = n.id')
      .orderBy('n.id', 'ASC')
      .addOrderBy('ns.role', 'ASC')
      .getRawMany<NoteShareRow>();

    const map = new Map<number, NoteWithUsers>();
    for (const row of rows) {
      if (!map.has(row.note_id)) {
        map.set(row.note_id, {
          note_id: row.note_id,
          note_title: row.note_title,
          usuarios: [],
        });
      }
      map.get(row.note_id)?.usuarios.push({
        usuario_id: row.usuario_id,
        usuario_name: row.usuario_name,
        role: NoteShareRole[row.role],
      });
    }
    return Array.from(map.values());
  }

  async createAndUpdate(dto: NoteDto) {
    if (dto.id) {
      const exists = await this.noteRepo.findOneBy({ id: dto.id });
      if (!exists) {
        throw new NotFoundException(`Note with id ${dto.id} not found`);
      }
      exists.title = dto.title;
      exists.content = dto.content;
      return await this.noteRepo.save(exists);
    }

    if (!dto.usuarioId) {
      throw new BadRequestException(
        'usuarioId is required when creating a note',
      );
    }

    const newNote = this.noteRepo.create({
      title: dto.title,
      content: dto.content,
    });
    const saved = await this.noteRepo.save(newNote);

    const ownerShare = this.noteShareRepo.create({
      note_id: saved.id,
      usuario_id: dto.usuarioId,
      role: NoteShareRole.ADMINISTRADOR,
    });
    await this.noteShareRepo.save(ownerShare);

    return saved;
  }

  async delete(id: number) {
    await this.noteRepo.delete({ id });
    return { message: `Note with id ${id} removed` };
  }
}
