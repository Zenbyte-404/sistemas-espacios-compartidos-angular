import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDatos } from './gestor-datos';

describe('GestorDatos', () => {
  let component: GestorDatos;
  let fixture: ComponentFixture<GestorDatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorDatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorDatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
