import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingsScheduleComponent } from './add-trainings-schedule.component';

describe('AddTrainingsScheduleComponent', () => {
  let component: AddTrainingsScheduleComponent;
  let fixture: ComponentFixture<AddTrainingsScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingsScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
