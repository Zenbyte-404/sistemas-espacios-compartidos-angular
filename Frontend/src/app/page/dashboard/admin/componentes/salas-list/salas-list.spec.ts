import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasList } from './salas-list';

describe('SalasList', () => {
  let component: SalasList;
  let fixture: ComponentFixture<SalasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalasList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
