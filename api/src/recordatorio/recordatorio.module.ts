import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recordatorio } from './entities/recordatorio.entity';
import { RecordatorioService } from './recordatorio.service';
import { RecordatorioController } from './recordatorio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recordatorio])],
  providers: [RecordatorioService],
  controllers: [RecordatorioController],
})
export class RecordatorioModule {}
