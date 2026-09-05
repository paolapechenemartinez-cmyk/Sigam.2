import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  email = '';
  mensaje = '';

  recuperarPassword() {
    if (!this.email) {
      this.mensaje = 'Ingresa tu correo electrónico.';
      return;
    }

    window.location.href =
      'http://127.0.0.1:8000/recuperar/?email=' +
      encodeURIComponent(this.email);
  }
}