import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkoutRoomComponent } from './create-workout-room.component';

describe('CreateWorkoutRoomComponent', () => {
  let component: CreateWorkoutRoomComponent;
  let fixture: ComponentFixture<CreateWorkoutRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkoutRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
