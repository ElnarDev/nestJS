export interface NoteShareRow {
  nota_id: number;
  nota_title: string;
  person_id: number;
  person_name: string;
  role: number;
}

export interface NoteWithUsers {
  nota_id: number;
  nota_title: string;
  usuarios: { person_id: number; person_name: string; role: string }[];
}
