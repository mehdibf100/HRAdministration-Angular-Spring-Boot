import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancesHrComponent } from './attendances-hr.component';

describe('AttendancesHrComponent', () => {
  let component: AttendancesHrComponent;
  let fixture: ComponentFixture<AttendancesHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendancesHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendancesHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
