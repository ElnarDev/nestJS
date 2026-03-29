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
import { Nota } from '../../nota/entities/nota.entity';
import { Person } from '../../person/entities/person.entity';
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

  @ManyToOne(() => Nota, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'note_id' })
  nota: Nota;

  @ManyToOne(() => Person, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  person: Person;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
