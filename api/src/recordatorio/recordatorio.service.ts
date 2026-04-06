import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recordatorio } from './entities/recordatorio.entity';
import { RecordatorioDto } from './dto/recordatorio.dto';

@Injectable()
export class RecordatorioService {
  constructor(
    @InjectRepository(Recordatorio)
    private recordatorioRepo: Repository<Recordatorio>,
  ) {}

  async findAll() {
    return await this.recordatorioRepo.find({
      relations: ['note'],
      order: { id: 'ASC' },
    });
  }

  async findById(id: number) {
    return await this.recordatorioRepo.findOne({
      where: { id },
      relations: ['note'],
    });
  }

  async findByNoteId(noteId: number) {
    return await this.recordatorioRepo.find({
      where: { note_id: noteId },
      relations: ['note'],
      order: { id: 'ASC' },
    });
  }

  async create(dto: RecordatorioDto) {
    const newRecordatorio = this.recordatorioRepo.create({
      note_id: dto.note_id,
      activo: dto.activo ?? true,
    });
    return await this.recordatorioRepo.save(newRecordatorio);
  }

  async delete(id: number) {
    const record = await this.recordatorioRepo.findOneBy({ id });
    if (!record) {
      throw new NotFoundException(`Recordatorio with id ${id} not found`);
    }
    await this.recordatorioRepo.delete({ id });
    return { message: `Recordatorio with id ${id} removed` };
  }
}
