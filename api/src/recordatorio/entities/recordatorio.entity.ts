import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Note } from '../../note/entities/note.entity';

@Entity('recordatorio')
export class Recordatorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'note_id' })
  note_id: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ManyToOne(() => Note, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
