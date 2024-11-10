import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestsComponent } from './leaverequests.component';

describe('LeaverequestsComponent', () => {
  let component: LeaveRequestsComponent;
  let fixture: ComponentFixture<LeaveRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
