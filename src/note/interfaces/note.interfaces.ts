export interface NoteShareRow {
  note_id: number;
  note_title: string;
  usuario_id: number;
  usuario_name: string;
  role: number;
}

export interface NoteWithUsers {
  note_id: number;
  note_title: string;
  usuarios: { usuario_id: number; usuario_name: string; role: string }[];
}
