import { Controller, Post, Body, Param } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentDto } from './dto/attachment.dto';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post('getall')
  findAll() {
    return this.attachmentService.findAll();
  }

  @Post('getbyid/:id')
  findById(@Param('id') id: string) {
    return this.attachmentService.findById(+id);
  }

  @Post('save')
  save(@Body() dto: AttachmentDto) {
    return this.attachmentService.save(dto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.attachmentService.delete(+id);
  }
}
