import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUsuarioDto, UpdateUsuarioDto, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    private readonly apiUrl = 'http://localhost:3000/api/v2/usuario';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    getById(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    create(dto: CreateUsuarioDto): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, dto);
    }

    update(dto: UpdateUsuarioDto): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, dto);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
