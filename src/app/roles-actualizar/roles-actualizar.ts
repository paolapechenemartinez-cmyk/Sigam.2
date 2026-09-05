import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles-actualizar',
  templateUrl: './roles-actualizar.html',
  styleUrl: './roles-actualizar.css',
  standalone: true,
  imports: [FormsModule],
})
export class RolesActualizar {
  @Input() id = 1;
  @Input() nombre = '';

  @Output() guardarRol = new EventEmitter<string>();
  @Output() cancelar = new EventEmitter<void>();

  actualizar() {
    this.guardarRol.emit(this.nombre);
  }
}