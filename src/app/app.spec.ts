import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { App } from './app';
import { RolesService } from './roles/roles.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load the user list from the API with id, name, email, and phone columns', () => {
    const service = TestBed.inject(RolesService);
    spyOn(service, 'listarRoles').and.returnValue(of([
      { id: 1, nombre: 'Administrador', correo: 'admin@demo.com', telefono: '111111111' },
      { id: 2, nombre: 'Usuario', correo: 'usuario@demo.com', telefono: '222222222' },
    ]));

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lista de usuarios');
    expect(compiled.textContent).toContain('ID');
    expect(compiled.textContent).toContain('Nombre');
    expect(compiled.textContent).toContain('Correo');
    expect(compiled.textContent).toContain('Teléfono');
    expect(compiled.textContent).toContain('Administrador');
    expect(compiled.textContent).toContain('admin@demo.com');
  });

  it('should request the API URL with the /api prefix', () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    const service = TestBed.inject(RolesService);

    service.listarRoles().subscribe();

    const req = httpTesting.expectOne('http://127.0.0.1:8000/api/usuarios/');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, nombre: 'Administrador', correo: 'admin@demo.com', telefono: '111111111' }]);
    httpTesting.verify();
  });
});
