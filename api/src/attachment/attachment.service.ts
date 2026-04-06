import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import { AttachmentDto } from './dto/attachment.dto';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepo: Repository<Attachment>,
  ) {}

  async findAll() {
    return await this.attachmentRepo.find({
      select: [
        'id',
        'note_id',
        'file_name',
        'file_type',
        'file_size',
        'created_at',
        'updated_at',
      ],
      order: { id: 'ASC' },
    });
  }

  async findById(id: number) {
    const attachment = await this.attachmentRepo.findOneBy({ id });
    if (!attachment) {
      throw new NotFoundException(`Attachment with id ${id} not found`);
    }
    return attachment;
  }

  async save(dto: AttachmentDto) {
    const fileBuffer = Buffer.from(dto.file_data, 'base64');
    const newAttachment = this.attachmentRepo.create({
      note_id: dto.note_id,
      file_name: dto.file_name,
      file_type: dto.file_type,
      file_size: dto.file_size ?? fileBuffer.length,
      file_data: fileBuffer,
    });
    const saved = await this.attachmentRepo.save(newAttachment);
    const { file_data: _, ...result } = saved;
    return result;
  }

  async delete(id: number) {
    const attachment = await this.attachmentRepo.findOneBy({ id });
    if (!attachment) {
      throw new NotFoundException(`Attachment with id ${id} not found`);
    }
    await this.attachmentRepo.delete({ id });
    return { message: `Attachment with id ${id} removed` };
  }
}
