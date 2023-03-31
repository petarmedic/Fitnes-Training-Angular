import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyCardForApprovalComponent } from './loyalty-card-for-approval.component';

describe('LoyaltyCardForApprovalComponent', () => {
  let component: LoyaltyCardForApprovalComponent;
  let fixture: ComponentFixture<LoyaltyCardForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyCardForApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyCardForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
