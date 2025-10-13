import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasForm } from './salas-form';

describe('SalasForm', () => {
  let component: SalasForm;
  let fixture: ComponentFixture<SalasForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalasForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalasForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
