import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup } from './singup';

describe('Singup', () => {
  let component: Singup;
  let fixture: ComponentFixture<Singup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Singup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Singup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
