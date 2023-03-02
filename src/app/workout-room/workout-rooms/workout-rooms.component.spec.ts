import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutRoomsComponent } from './workout-rooms.component';

describe('WorkoutRoomsComponent', () => {
  let component: WorkoutRoomsComponent;
  let fixture: ComponentFixture<WorkoutRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
