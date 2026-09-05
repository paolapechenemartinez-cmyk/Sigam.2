import { Component } from '@angular/core';

@Component({
  selector: 'app-roles-actualizar',
  templateUrl: './roles-actualizar.html',
  styleUrl: './roles-actualizar.css',
  standalone: true,
})
export class RolesActualizar {
  nombre = '';

  actualizar(nombre: string) {
    this.nombre = `${nombre} actualizado`;
  }

  cancelar() {
    this.nombre = '';
  }
}