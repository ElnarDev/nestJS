export interface NotaModel {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateNotaDto {
    title: string;
    content: string;
}

export interface UpdateNotaDto {
    id: number;
    title: string;
    content: string;
}
