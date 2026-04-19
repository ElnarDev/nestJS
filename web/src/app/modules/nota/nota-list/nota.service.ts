import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaModel } from '../shared/nota.model';

@Injectable({ providedIn: 'root' })
export class NotaService {
    private readonly apiUrl = 'http://localhost:3000/api/v2/note';

    constructor(private http: HttpClient) {}

    getAll(): Observable<NotaModel[]> {
        return this.http.get<NotaModel[]>(this.apiUrl);
    }

    getById(id: number): Observable<NotaModel> {
        return this.http.get<NotaModel>(`${this.apiUrl}/${id}`);
    }

    // create(dto: CreateNotaDto): Observable<NotaModel> {
    //     return this.http.post<NotaModel>(this.apiUrl, dto);
    // }

    // update(dto: UpdateNotaDto): Observable<NotaModel> {
    //     return this.http.put<NotaModel>(`${this.apiUrl}/${dto.id}`, dto);
    // }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
