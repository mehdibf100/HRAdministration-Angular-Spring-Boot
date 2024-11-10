import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeHrComponent } from './update-employee-hr.component';

describe('UpdateEmployeeHrComponent', () => {
  let component: UpdateEmployeeHrComponent;
  let fixture: ComponentFixture<UpdateEmployeeHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEmployeeHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeeHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
