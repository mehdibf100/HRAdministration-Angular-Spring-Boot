import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceListHrComponent } from './attendance-list-hr.component';

describe('AttendanceListHrComponent', () => {
  let component: AttendanceListHrComponent;
  let fixture: ComponentFixture<AttendanceListHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceListHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceListHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
