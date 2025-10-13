import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasDalete } from './salas-dalete';

describe('SalasDalete', () => {
  let component: SalasDalete;
  let fixture: ComponentFixture<SalasDalete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalasDalete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalasDalete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
