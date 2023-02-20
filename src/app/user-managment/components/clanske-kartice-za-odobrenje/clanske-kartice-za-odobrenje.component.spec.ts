import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanskeKarticeZaOdobrenjeComponent } from './clanske-kartice-za-odobrenje.component';

describe('ClanskeKarticeZaOdobrenjeComponent', () => {
  let component: ClanskeKarticeZaOdobrenjeComponent;
  let fixture: ComponentFixture<ClanskeKarticeZaOdobrenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanskeKarticeZaOdobrenjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanskeKarticeZaOdobrenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
