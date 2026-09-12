import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService, Usuario } from './roles/roles.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pagina">
      <aside class="menu">
        <h1>Ambulancias</h1>
        <p>Panel administrativo</p>
        <small class="grupo">GENERAL</small>
        <a [class.seleccionado]="vista === 'inicio'" (click)="cambiarVista('inicio')">Inicio</a>
        <a [class.seleccionado]="vista === 'usuarios'" (click)="cambiarVista('usuarios')">Usuarios</a>
        <small class="grupo">OPERACIÓN</small>
        <a [class.seleccionado]="vista === 'ambulancias'" (click)="cambiarVista('ambulancias')">Ambulancias</a>
        <a [class.seleccionado]="vista === 'centros'" (click)="cambiarVista('centros')">Centros de salud</a>
        <a [class.seleccionado]="vista === 'solicitudes'" (click)="cambiarVista('solicitudes')">Solicitudes</a>
        <a [class.seleccionado]="vista === 'incidentes'" (click)="cambiarVista('incidentes')">Incidentes</a>
        <a [class.seleccionado]="vista === 'rutas'" (click)="cambiarVista('rutas')">Rutas</a>
      </aside>

      <main class="contenido">
        <header>
          <div>
            <small>Gestión de emergencias</small>
            <h2>{{ tituloVista }}</h2>
            <p>Usuarios, ambulancias y solicitudes</p>
          </div>
          <span class="estado">Activo</span>
        </header>

        <div class="resumen">
          <div><span>Usuarios</span><strong>{{ usuarios.length }}</strong></div>
          <div><span>Ambulancias</span><strong>24</strong></div>
          <div><span>Solicitudes activas</span><strong>8</strong></div>
        </div>

        <section class="container" *ngIf="vista === 'usuarios'">
          <div class="titulo">
            <div>
              <h3>Usuarios registrados</h3>
              <p>Información de la tabla usuario.</p>
            </div>
            <p class="mensaje" *ngIf="mensaje">{{ mensaje }}</p>
          </div>

          <div class="formulario">
            <input [(ngModel)]="nuevoUsuario.nombre" placeholder="Nombre" />
            <input [(ngModel)]="nuevoUsuario.correo" type="email" placeholder="Correo" />
            <input [(ngModel)]="nuevoUsuario.telefono" placeholder="Teléfono" />
            <button class="create" (click)="crearUsuario()">Crear</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let usuario of usuarios">
                <td>{{ usuario.id }}</td>
                <td><input [(ngModel)]="usuario.nombre" /></td>
                <td><input [(ngModel)]="usuario.correo" type="email" /></td>
                <td><input [(ngModel)]="usuario.telefono" /></td>
                <td>
                  <div class="acciones">
                    <button class="update" (click)="actualizarUsuario(usuario.id, usuario)">Actualizar</button>
                    <button class="delete" (click)="eliminarUsuario(usuario.id)">Eliminar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="container" *ngIf="vista === 'ambulancias'">
          <div class="formulario-titulo">
            <span>Ambulancias / Registrar ambulancia</span>
            <h3>Registrar ambulancia</h3>
            <p>Ingresa la información de la nueva ambulancia para agregarla al sistema.</p>
          </div>
          <div class="formulario-ambulancia">
            <h3>Información de la ambulancia</h3>
            <label>Placa <input [(ngModel)]="nuevaAmbulancia.placa" placeholder="AMB-" /></label>
            <label>Tipo de ambulancia
              <select [(ngModel)]="nuevaAmbulancia.tipo"><option value="">Selecciona un tipo</option><option>Básica</option><option>Medicalizada</option></select>
            </label>
            <label>Modelo <input [(ngModel)]="nuevaAmbulancia.modelo" placeholder="Ej: 2024" /></label>
            <label>Institución
              <select [(ngModel)]="nuevaAmbulancia.institucion"><option value="">Selecciona una institución</option><option>Hospital Universitario San José</option><option>Centro Norte</option></select>
            </label>
            <label>Estado
              <select [(ngModel)]="nuevaAmbulancia.estado"><option value="">Selecciona el estado inicial</option><option>Disponible</option><option>En servicio</option></select>
            </label>
            <label>Kilometraje <input [(ngModel)]="nuevaAmbulancia.kilometraje" placeholder="Ej: 45230 km" /></label>
            <label class="campo-largo">Observaciones <textarea [(ngModel)]="nuevaAmbulancia.observaciones" placeholder="Escribe observaciones sobre la ambulancia..."></textarea></label>
            <div class="acciones-formulario"><button class="cancelar" (click)="limpiarAmbulancia()">Cancelar</button><button class="create" (click)="guardarAmbulancia()">Guardar ambulancia</button></div>
          </div>
        </section>

        <section class="container" *ngIf="vista === 'centros'">
          <h3>Centros de salud</h3>
          <table>
            <thead><tr><th>ID</th><th>Nombre</th><th>Dirección</th><th>Teléfono</th></tr></thead>
            <tbody>
              <tr *ngFor="let centro of centros">
                <td>{{ centro.id }}</td><td>{{ centro.nombre }}</td><td>{{ centro.direccion }}</td><td>{{ centro.telefono }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="container" *ngIf="vista === 'solicitudes'">
          <h3>Solicitudes</h3>
          <table>
            <thead><tr><th>ID</th><th>Usuario</th><th>Estado</th><th>Origen</th><th>Destino</th></tr></thead>
            <tbody>
              <tr *ngFor="let solicitud of solicitudes">
                <td>{{ solicitud.id }}</td><td>{{ solicitud.usuario }}</td><td>{{ solicitud.estado }}</td><td>{{ solicitud.origen }}</td><td>{{ solicitud.destino }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="container" *ngIf="vista === 'incidentes'">
          <h3>Incidentes</h3>
          <table>
            <thead><tr><th>ID</th><th>Tipo</th><th>Prioridad</th><th>Descripción</th><th>Estado</th></tr></thead>
            <tbody>
              <tr *ngFor="let incidente of incidentes">
                <td>{{ incidente.id }}</td><td>{{ incidente.tipo }}</td><td>{{ incidente.prioridad }}</td><td>{{ incidente.descripcion }}</td><td>{{ incidente.estado }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="container" *ngIf="vista === 'rutas'">
          <h3>Rutas</h3>
          <table>
            <thead><tr><th>ID</th><th>Origen</th><th>Destino</th><th>Distancia</th><th>Tiempo estimado</th></tr></thead>
            <tbody>
              <tr *ngFor="let ruta of rutas">
                <td>{{ ruta.id }}</td><td>{{ ruta.origen }}</td><td>{{ ruta.destino }}</td><td>{{ ruta.distancia }}</td><td>{{ ruta.tiempo }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="container otra-pagina" *ngIf="vista === 'inicio'">
          <h3>Inicio</h3>
          <p>Resumen del sistema de ambulancias.</p>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
      .pagina {
        display: flex;
        min-height: 100vh;
         background: #f7f7f7;
        color: #263238;
        font-family: "Segoe UI", sans-serif;
      }

      .menu {
        width: 220px;
        flex-shrink: 0;
        padding: 28px 18px;
        background: white;
        color: #4b5563;
        box-sizing: border-box;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
      }

      .menu h1 { margin: 0; color: #a75312; font-size: 24px; }
      .menu p { color: #777; font-size: 13px; }
      .menu .grupo { display: block; margin: 26px 12px 8px; color: #999; font-size: 10px; letter-spacing: 1px; }
      .menu a { display: block; margin: 3px 0; padding: 12px; cursor: pointer; color: #555; transition: background 0.2s; }
      .menu .seleccionado { background: #ff7900; color: white; border-radius: 7px; }
      .menu a:hover { background: #fff0e2; color: #c45f00; }

      .contenido { flex: 1; padding: 32px; min-width: 0; }
      header { display: flex; justify-content: space-between; align-items: start; }
      header small { color: #f57c00; text-transform: uppercase; }
      header h2 { margin: 6px 0; font-size: 28px; }
      header p { margin: 0; color: #78909c; }
      .estado { padding: 7px 12px; background: #fff0df; color: #c45f00; font-size: 12px; }

      .resumen { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 28px 0; }
      .resumen div { padding: 20px; background: white; border: 1px solid #e1e7e8; }
      .resumen span { color: #78909c; font-size: 12px; }
      .resumen strong { display: block; margin-top: 10px; font-size: 24px; }
      .titulo { display: flex; justify-content: space-between; margin-bottom: 18px; }
      .titulo h3 { margin: 0; }
      .titulo p { margin: 5px 0 0; color: #78909c; font-size: 13px; }
      .formulario-titulo { margin-bottom: 18px; }
      .formulario-titulo span { color: #777; font-size: 12px; }
      .formulario-titulo h3 { margin: 14px 0 5px; font-size: 28px; }
      .formulario-titulo p { margin: 0; color: #78909c; }
      .formulario-ambulancia { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; padding: 22px; border: 1px solid #efcdb7; border-radius: 8px; }
      .formulario-ambulancia h3 { grid-column: 1 / -1; margin: 0; padding-bottom: 14px; border-bottom: 1px solid #e5e5e5; color: #424242; }
      .formulario-ambulancia label { display: grid; gap: 7px; color: #424242; font-size: 13px; font-weight: 600; }
      .formulario-ambulancia select, .formulario-ambulancia textarea { width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #dfd1c8; border-radius: 6px; background: white; font: inherit; }
      .formulario-ambulancia textarea { min-height: 90px; resize: vertical; }
      .campo-largo { grid-column: 1 / -1; }
      .acciones-formulario { grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 10px; padding-top: 16px; border-top: 1px solid #e5e5e5; }
      .cancelar { background: white; color: #555; border: 1px solid #dfd1c8; }

      :host {
        display: block;
        min-height: 100vh;
        font-family: Arial, sans-serif;
      }

      .container {
        max-width: none;
        margin: 0 auto;
        background: white;
        border: 1px solid #cfd4d8;
        padding: 18px;
        box-shadow: 0 2px 8px rgba(38, 50, 56, 0.06);
      }

      h2 {
        margin: 0 0 16px;
        color: #f57c00;
        font-size: 22px;
      }

      table {
        width: 100%;
        min-width: 760px;
        border-collapse: collapse;
        table-layout: fixed;
      }

      th {
        background: #e7eaed;
        border: 1px solid #cfd4d8;
        color: #263238;
        font-size: 13px;
        font-weight: bold;
        padding: 10px 6px;
        text-align: left;
         text-transform: uppercase;
      }

      td {
        border: 1px solid #cfd4d8;
        background: #fff;
        color: #222222;
        padding: 10px 6px;
      }

        tbody tr:hover td { background: #fff8f0; }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 7px;
        border: 1px solid #cfd4d8;
      }

      button {
        border: none;
        border-radius: 2px;
        padding: 8px 10px;
        cursor: pointer;
        font-size: 13px;
        color: white;
         font-family: inherit;
         transition: opacity 0.2s;
      }

        button:hover { opacity: 0.82; }

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

      .create { background: #f57c00; }
      .formulario { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 10px; margin-bottom: 20px; }

      @media (max-width: 800px) {
        .menu { width: 150px; }
        .contenido { padding: 24px 16px; }
        .resumen, .formulario { grid-template-columns: 1fr; }
        .container { overflow-x: auto; }
      }

      @media (max-width: 1000px) {
        .contenido { padding: 24px; }
        .resumen { grid-template-columns: 1fr; }
      }

      /* Visual identity: graphite surfaces with warm orange signals. */
      :host {
        --graphite: #25282b;
        --graphite-soft: #34383c;
        --steel: #687078;
        --line: #dfe2e4;
        --paper: #fbfaf8;
        --orange: #f26b21;
        --orange-dark: #c94f12;
        --orange-pale: #fff0e6;
        display: block;
        background: var(--paper);
        font-family: "Trebuchet MS", "Segoe UI", sans-serif;
      }

      .pagina {
        background: var(--paper);
        background-image: linear-gradient(135deg, rgba(242, 107, 33, 0.04) 0, rgba(242, 107, 33, 0.04) 1px, transparent 1px, transparent 18px);
        background-size: 18px 18px;
      }

      .menu {
        width: 248px;
        padding: 30px 20px;
        background: var(--graphite);
        color: #f4f1ed;
        box-shadow: 10px 0 28px rgba(37, 40, 43, 0.12);
      }

      .menu h1 {
        color: #fff;
        font-size: 25px;
        letter-spacing: 0.5px;
      }

      .menu h1::before {
        content: "";
        display: inline-block;
        width: 9px;
        height: 9px;
        margin: 0 9px 3px 0;
        background: var(--orange);
        border-radius: 50%;
        box-shadow: 0 0 0 5px rgba(242, 107, 33, 0.16);
      }

      .menu p { color: #aeb4b8; }
      .menu .grupo { color: #858c92; font-weight: 700; }
      .menu a {
        margin: 5px 0;
        padding: 12px 14px;
        border-left: 3px solid transparent;
        color: #cdd1d3;
        border-radius: 0 8px 8px 0;
        transition: background 0.2s, color 0.2s, transform 0.2s;
      }

      .menu a:hover {
        background: var(--graphite-soft);
        color: #fff;
        transform: translateX(3px);
      }

      .menu .seleccionado {
        background: var(--orange);
        border-left-color: #ffd2b8;
        color: #fff;
        box-shadow: 0 8px 18px rgba(242, 107, 33, 0.22);
      }

      .contenido { padding: 38px clamp(20px, 4vw, 54px); }
      header { padding-bottom: 6px; }
      header small { color: var(--orange-dark); font-weight: 700; letter-spacing: 1.5px; }
      header h2 { color: var(--graphite); font-size: clamp(26px, 4vw, 38px); letter-spacing: -0.5px; }
      header p { color: var(--steel); }
      .estado {
        background: var(--orange-pale);
        border: 1px solid #ffd0b3;
        border-radius: 999px;
        color: var(--orange-dark);
        font-weight: 700;
      }

      .resumen { gap: 18px; margin: 30px 0 22px; }
      .resumen div {
        position: relative;
        overflow: hidden;
        padding: 22px;
        background: rgba(255, 255, 255, 0.88);
        border: 1px solid var(--line);
        border-radius: 10px;
        box-shadow: 0 8px 20px rgba(37, 40, 43, 0.06);
      }

      .resumen div::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 46px;
        height: 4px;
        background: var(--orange);
      }

      .resumen span { color: var(--steel); font-weight: 700; }
      .resumen strong { color: var(--graphite); font-size: 30px; }
      .container {
        border: 1px solid var(--line);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.94);
        padding: 24px;
        box-shadow: 0 12px 28px rgba(37, 40, 43, 0.07);
      }

      .container h3 { color: var(--graphite); font-size: 21px; }
      .titulo p, .formulario-titulo p { color: var(--steel); }
      table { min-width: 760px; border-spacing: 0; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
      th { background: var(--graphite-soft); border-color: var(--graphite-soft); color: #fff; letter-spacing: 0.8px; }
      td { border-color: var(--line); color: #34383c; }
      tbody tr:nth-child(even) td { background: #f7f8f8; }
      tbody tr:hover td { background: var(--orange-pale); }
      input, select, textarea { border-color: #cfd4d7; border-radius: 6px; transition: border-color 0.2s, box-shadow 0.2s; }
      input:focus, select:focus, textarea:focus { outline: none; border-color: var(--orange); box-shadow: 0 0 0 3px rgba(242, 107, 33, 0.14); }
      button { border-radius: 6px; font-weight: 700; transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s; }
      button:hover { opacity: 1; transform: translateY(-1px); box-shadow: 0 5px 12px rgba(37, 40, 43, 0.14); }
      .create, .update { background: var(--orange); }
      .create:hover, .update:hover { background: var(--orange-dark); }
      .delete { background: var(--graphite-soft); }
      .cancelar { color: var(--graphite); }

      @media (max-width: 800px) {
        .menu { width: 188px; padding: 24px 14px; }
        .contenido { padding: 24px 14px; }
        .container { padding: 18px; }
      }
    `,
  ],
})
export class App implements OnInit {
  vista = 'usuarios';
  tituloVista = 'Usuarios';
  usuarios: Usuario[] = [
    { id: 1, nombre: 'Administrador', correo: 'admin@demo.com', telefono: '111111111' },
    { id: 2, nombre: 'Usuario', correo: 'usuario@demo.com', telefono: '222222222' },
  ];
  nuevoUsuario: Usuario = { id: 0, nombre: '', correo: '', telefono: '' };
  nuevaAmbulancia = { placa: '', tipo: '', modelo: '', institucion: '', estado: '', kilometraje: '', observaciones: '' };
  ambulancias = [
    { id: 1, placa: 'ABC-123', tipo: 'Básica', estado: 'Disponible', centro: 'Central' },
    { id: 2, placa: 'DEF-456', tipo: 'Medicalizada', estado: 'En servicio', centro: 'Norte' },
  ];
  centros = [
    { id: 1, nombre: 'Central', direccion: 'Calle 10 # 20-30', telefono: '6015550101' },
    { id: 2, nombre: 'Centro Norte', direccion: 'Carrera 8 # 15-20', telefono: '6015550102' },
  ];
  solicitudes = [
    { id: 1, usuario: 'Administrador', estado: 'Pendiente', origen: 'Calle 10', destino: 'Central' },
    { id: 2, usuario: 'Usuario', estado: 'Atendida', origen: 'Carrera 8', destino: 'Centro Norte' },
  ];
  incidentes = [
    { id: 1, tipo: 'Accidente', prioridad: 'Alta', descripcion: 'Colisión vehicular', estado: 'Abierto' },
    { id: 2, tipo: 'Emergencia', prioridad: 'Media', descripcion: 'Solicitud de traslado', estado: 'Cerrado' },
  ];
  rutas = [
    { id: 1, origen: 'Calle 10', destino: 'Central', distancia: '4.5 km', tiempo: '12 min' },
    { id: 2, origen: 'Carrera 8', destino: 'Centro Norte', distancia: '7.2 km', tiempo: '18 min' },
  ];
  mensaje = '';

  constructor(private rolesService: RolesService) {}

  cambiarVista(vista: string) {
    this.vista = vista;
    this.tituloVista = vista === 'centros'
      ? 'Centros de salud'
      : vista.charAt(0).toUpperCase() + vista.slice(1);
  }

  guardarAmbulancia() {
    this.mensaje = 'Ambulancia guardada';
  }

  limpiarAmbulancia() {
    this.nuevaAmbulancia = { placa: '', tipo: '', modelo: '', institucion: '', estado: '', kilometraje: '', observaciones: '' };
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.rolesService.listarRoles().subscribe({
      next: usuarios => this.usuarios = usuarios,
      error: error => console.error('No se pudieron cargar los usuarios', error),
    });
  }

  crearUsuario() {
    this.rolesService.crearUsuario(this.nuevoUsuario).subscribe({
      next: usuario => {
        this.usuarios.push(usuario);
        this.nuevoUsuario = { id: 0, nombre: '', correo: '', telefono: '' };
        this.mensaje = 'Usuario creado';
      },
      error: error => this.mensaje = error.error?.correo?.[0] || 'No se pudo crear el usuario',
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

