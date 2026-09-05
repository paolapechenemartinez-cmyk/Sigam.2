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
    { id: 1, nombre: 'Administrador', correo: 'admin@demo.com', telefono: '111111111' },
    { id: 2, nombre: 'Usuario', correo: 'usuario@demo.com', telefono: '222222222' },
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