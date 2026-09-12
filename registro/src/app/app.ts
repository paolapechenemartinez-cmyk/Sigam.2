import { Component } from '@angular/core';
import { Register } from './register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Register],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}