import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancesEmployeeComponent } from './attendances.component';

describe('AttendancesEmployeeComponent', () => {
  let component: AttendancesEmployeeComponent;
  let fixture: ComponentFixture<AttendancesEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendancesEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendancesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
