import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Note } from '../../note/entities/note.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { NoteShareRole } from '../enums/note-share-role.enum';

@Entity('note_share')
@Unique(['note_id', 'usuario_id'])
export class NoteShare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  role: NoteShareRole;

  @Column({ name: 'note_id' })
  note_id: number;

  @Column({ name: 'usuario_id' })
  usuario_id: number;

  @ManyToOne(() => Note, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
