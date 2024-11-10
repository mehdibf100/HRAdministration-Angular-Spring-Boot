import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTrackingComponent } from './task-tracking.component';

describe('TaskTrackingComponent', () => {
  let component: TaskTrackingComponent;
  let fixture: ComponentFixture<TaskTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
