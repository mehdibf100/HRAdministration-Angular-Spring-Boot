import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveListHrComponent } from './leave-list-hr.component';

describe('LeaveListHrComponent', () => {
  let component: LeaveListHrComponent;
  let fixture: ComponentFixture<LeaveListHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveListHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveListHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
