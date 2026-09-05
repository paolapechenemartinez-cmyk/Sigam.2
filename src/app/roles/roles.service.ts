import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Role {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient) {}

  actualizarRol(id: number, nombre: string): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, { nombre });
  }

  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
