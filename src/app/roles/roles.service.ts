import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/usuarios';

  constructor(private http: HttpClient) {}

  listarRoles() {
    return this.http.get<Usuario[]>(`${this.apiUrl}/`);
  }

  actualizarRol(id: number, usuario: Usuario) {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}/`, usuario);
  }

  eliminarRol(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}
