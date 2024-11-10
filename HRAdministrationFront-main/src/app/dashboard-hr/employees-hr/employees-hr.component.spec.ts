import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesHrComponent } from './employees-hr.component';

describe('EmployeesHrComponent', () => {
  let component: EmployeesHrComponent;
  let fixture: ComponentFixture<EmployeesHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
