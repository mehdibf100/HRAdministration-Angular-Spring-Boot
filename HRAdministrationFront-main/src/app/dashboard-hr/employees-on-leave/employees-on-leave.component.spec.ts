import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesOnLeaveComponent } from './employees-on-leave.component';

describe('EmployeesOnLeaveComponent', () => {
  let component: EmployeesOnLeaveComponent;
  let fixture: ComponentFixture<EmployeesOnLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesOnLeaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesOnLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
