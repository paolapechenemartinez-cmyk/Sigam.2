import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Usuarios</h2>

      <div class="usuario" *ngFor="let usuario of usuarios">
        <div class="info">
          <strong>{{ usuario.nombre }}</strong>
          <span>{{ usuario.email }}</span>
        </div>

        <div class="acciones">
          <button class="update" (click)="actualizarUsuario(usuario.id)">Actualizar</button>
          <button class="delete" (click)="eliminarUsuario(usuario.id)">Eliminar</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #1f2937;
        padding: 32px 20px;
        font-family: Arial, sans-serif;
      }

      .container {
        max-width: 760px;
        margin: 0 auto;
        background: white;
        border: 1px solid #d6d6d6;
        padding: 22px;
      }

      h2 {
        margin: 0 0 18px;
        color: #f57c00;
        font-size: 24px;
      }

      .usuario {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #dddddd;
        padding: 14px 4px;
        gap: 16px;
      }

      .info {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .info strong {
        color: #111827;
      }

      .info span {
        color: #6b7280;
        font-size: 0.9rem;
      }

      .acciones {
        display: flex;
        gap: 8px;
      }

      button {
        border: none;
        border-radius: 3px;
        padding: 7px 10px;
        cursor: pointer;
        font-size: 0.85rem;
        color: white;
      }

      .update {
        background: #f57c00;
      }

      .delete {
        background: #4b5563;
      }
    `,
  ],
})
export class App {
  private readonly apiUrl = 'http://127.0.0.1:8000/usuarios';

  usuarios: Usuario[] = [
    { id: 1, nombre: 'Ana García', email: 'ana@email.com' },
    { id: 2, nombre: 'Luis Pérez', email: 'luis@email.com' },
    { id: 3, nombre: 'María López', email: 'maria@email.com' },
    { id: 4, nombre: 'Carlos Rodríguez', email: 'carlos@email.com' },
    { id: 5, nombre: 'Sofía Martínez', email: 'sofia@email.com' },
    { id: 6, nombre: 'Diego Torres', email: 'diego@email.com' },
    { id: 7, nombre: 'Valentina Gómez', email: 'valentina@email.com' },
    { id: 8, nombre: 'Jorge Ramírez', email: 'jorge@email.com' },
    { id: 9, nombre: 'Camila Herrera', email: 'camila@email.com' },
    { id: 10, nombre: 'Andrés Castro', email: 'andres@email.com' },
  ];

  constructor(private http: HttpClient) {}

  actualizarUsuario(id: number) {
    const usuario = this.usuarios.find(u => u.id === id);

    if (usuario) {
      const usuarioActualizado = {
        ...usuario,
        nombre: `${usuario.nombre} actualizado`,
      };

      this.http.put<Usuario>(`${this.apiUrl}/${id}/`, usuarioActualizado).subscribe({
        next: respuesta => {
          this.usuarios = this.usuarios.map(item => item.id === id ? respuesta : item);
        },
        error: error => console.error('No se pudo actualizar el usuario', error),
      });
    }
  }

  eliminarUsuario(id: number) {
    this.http.delete(`${this.apiUrl}/${id}/`).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
      },
      error: error => console.error('No se pudo eliminar el usuario', error),
    });
  }
}

