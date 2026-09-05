import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService, Usuario } from './roles/roles.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Lista de usuarios</h2>
      <p class="mensaje" *ngIf="mensaje">{{ mensaje }}</p>

      <div class="encabezado">
        <span>ID</span>
        <span>Nombre</span>
        <span>Correo</span>
        <span>Teléfono</span>
        <span>Acciones</span>
      </div>

      <div class="fila" *ngFor="let usuario of usuarios">
        <span>{{ usuario.id }}</span>
        <input [(ngModel)]="usuario.nombre" />
        <input [(ngModel)]="usuario.correo" type="email" />
        <input [(ngModel)]="usuario.telefono" />
        <div class="acciones">
          <button class="update" (click)="actualizarUsuario(usuario.id, usuario)">Actualizar</button>
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
        max-width: 1100px;
        margin: 0 auto;
        background: white;
        border: 1px solid #d6d6d6;
        padding: 20px;
      }

      h2 {
        margin: 0 0 16px;
        color: #f57c00;
        font-size: 22px;
      }

      .encabezado,
      .fila {
        display: grid;
        grid-template-columns: 60px 1.2fr 1.8fr 1.1fr 220px;
        align-items: center;
        gap: 12px;
        padding: 10px 6px;
      }

      .encabezado {
        background: #eeeeee;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        color: #555555;
        font-size: 13px;
        font-weight: bold;
      }

      .fila {
        min-height: 44px;
        border-bottom: 1px solid #dddddd;
        color: #222222;
      }

      button {
        border: none;
        border-radius: 2px;
        padding: 8px 10px;
        cursor: pointer;
        font-size: 13px;
        color: white;
      }

      .acciones {
        display: flex;
        gap: 6px;
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
export class App implements OnInit {
  usuarios: Usuario[] = [];
  mensaje = '';

  constructor(private rolesService: RolesService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.rolesService.listarRoles().subscribe({
      next: usuarios => this.usuarios = usuarios,
      error: error => console.error('No se pudieron cargar los usuarios', error),
    });
  }

  actualizarUsuario(id: number, usuario: Usuario) {
    this.rolesService.actualizarRol(id, usuario).subscribe({
      next: respuesta => {
        this.usuarios = this.usuarios.map(item => item.id === id ? respuesta : item);
        this.mensaje = 'Usuario actualizado';
      },
      error: error => this.mensaje = error.error?.detail || 'No se pudo actualizar el usuario',
    });
  }

  eliminarUsuario(id: number) {
    this.rolesService.eliminarRol(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
        this.mensaje = 'Usuario eliminado';
      },
      error: error => this.mensaje = error.error?.detail || 'No se pudo eliminar el usuario',
    });
  }
}

