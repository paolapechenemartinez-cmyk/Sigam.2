import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.html',
  styleUrl: './roles.css',
  imports: [CommonModule],
  standalone: true,
})
export class Roles {
  roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Usuario' },
  ];

  actualizarRol(id: number, nombre: string) {
    const rol = this.roles.find(r => r.id === id);
    if (rol) {
      rol.nombre = nombre;
    }
  }

  eliminarRol(id: number) {
    this.roles = this.roles.filter(r => r.id !== id);
  }
}