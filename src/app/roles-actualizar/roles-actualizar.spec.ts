import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesActualizar } from './roles-actualizar';

describe('RolesActualizar', () => {
  let component: RolesActualizar;
  let fixture: ComponentFixture<RolesActualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesActualizar],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesActualizar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
