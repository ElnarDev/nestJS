import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { NoteShare } from '../note-share/entities/note-share.entity';
import { NoteShareRole } from '../note-share/enums/note-share-role.enum';
import { NotaDto } from './dto/nota.dto';
import { NoteShareRow, NoteWithUsers } from './interfaces/nota.interfaces';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private notaRepo: Repository<Nota>,
    @InjectRepository(NoteShare)
    private noteShareRepo: Repository<NoteShare>,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    return await this.notaRepo.find({
      order: { id: 'ASC' },
    });
  }

  async findById(id: number) {
    return await this.notaRepo.findOneBy({ id });
  }

  async findByPersonId(personId: number) {
    return await this.dataSource
      .createQueryBuilder()
      .select('n.id', 'nota_id')
      .addSelect('n.title', 'nota_title')
      .addSelect('p.id', 'person_id')
      .addSelect('p.name', 'person_name')
      .addSelect('ns.role', 'role')
      .from('note_share', 'ns')
      .innerJoin('usuario', 'p', 'ns.usuario_id = p.id')
      .innerJoin('note', 'n', 'ns.note_id = n.id')
      .where('p.id = :personId', { personId })
      .orderBy('n.id', 'ASC')
      .getRawMany<NoteShareRow>();
  }

  async findWithUsers(): Promise<NoteWithUsers[]> {
    const rows = await this.dataSource
      .createQueryBuilder()
      .select('n.id', 'nota_id')
      .addSelect('n.title', 'nota_title')
      .addSelect('p.id', 'person_id')
      .addSelect('p.name', 'person_name')
      .addSelect('ns.role', 'role')
      .from('note_share', 'ns')
      .innerJoin('usuario', 'p', 'ns.usuario_id = p.id')
      .innerJoin('note', 'n', 'ns.note_id = n.id')
      .orderBy('n.id', 'ASC')
      .addOrderBy('ns.role', 'ASC')
      .getRawMany<NoteShareRow>();

    const map = new Map<number, NoteWithUsers>();
    for (const row of rows) {
      if (!map.has(row.nota_id)) {
        map.set(row.nota_id, {
          nota_id: row.nota_id,
          nota_title: row.nota_title,
          usuarios: [],
        });
      }
      map.get(row.nota_id)?.usuarios.push({
        person_id: row.person_id,
        person_name: row.person_name,
        role: NoteShareRole[row.role],
      });
    }
    return Array.from(map.values());
  }

  async createAndUpdate(dto: NotaDto) {
    if (dto.id) {
      const exists = await this.notaRepo.findOneBy({ id: dto.id });
      if (!exists) {
        throw new NotFoundException(`Nota with id ${dto.id} not found`);
      }
      exists.title = dto.title;
      exists.content = dto.content;
      return await this.notaRepo.save(exists);
    }

    if (!dto.personId) {
      throw new BadRequestException(
        'personId is required when creating a nota',
      );
    }

    const newNota = this.notaRepo.create({
      title: dto.title,
      content: dto.content,
    });
    const saved = await this.notaRepo.save(newNota);

    const ownerShare = this.noteShareRepo.create({
      note_id: saved.id,
      usuario_id: dto.personId,
      role: NoteShareRole.ADMINISTRADOR,
    });
    await this.noteShareRepo.save(ownerShare);

    return saved;
  }

  async delete(id: number) {
    await this.notaRepo.delete({ id });
    return { message: `Nota with id ${id} removed` };
  }
}
