export interface Usuario {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface CreateUsuarioDto {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUsuarioDto {
    id: number;
    name: string;
    email: string;
    password?: string;
}
