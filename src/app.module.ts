import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { NoteModule } from './note/note.module';
import { NoteShareModule } from './note-share/note-share.module';
import { RecordatorioModule } from './recordatorio/recordatorio.module';
import { AttachmentModule } from './attachment/attachment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuarioModule,
    NoteModule,
    NoteShareModule,
    RecordatorioModule,
    AttachmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
