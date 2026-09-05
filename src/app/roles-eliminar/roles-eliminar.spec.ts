import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesEliminar } from './roles-eliminar';

describe('RolesEliminar', () => {
  let component: RolesEliminar;
  let fixture: ComponentFixture<RolesEliminar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesEliminar],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesEliminar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
