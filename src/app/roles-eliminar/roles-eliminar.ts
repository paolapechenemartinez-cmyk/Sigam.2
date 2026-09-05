import { Component } from '@angular/core';

@Component({
  selector: 'app-roles-eliminar',
  templateUrl: './roles-eliminar.html',
  styleUrl: './roles-eliminar.css',
  standalone: true,
  imports: [],
})
export class RolesEliminar {
  id = 1;
  nombre = 'juan';

  eliminar() {
    this.nombre = 'maria';
  }

  cancelar() {
    this.nombre = '';
  }
}
