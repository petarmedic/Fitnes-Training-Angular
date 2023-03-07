import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsForTrainingComponent } from './comments-for-training.component';

describe('CommentsForTrainingComponent', () => {
  let component: CommentsForTrainingComponent;
  let fixture: ComponentFixture<CommentsForTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsForTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsForTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
