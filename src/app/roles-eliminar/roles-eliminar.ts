import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-roles-eliminar',
  templateUrl: './roles-eliminar.html',
  styleUrl: './roles-eliminar.css',
  standalone: true,
  imports: [],
})
export class RolesEliminar {
  @Input() id = 1;
  @Input() nombre = '';

  @Output() confirmarEliminar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  eliminar() {
    this.confirmarEliminar.emit();
  }
}
