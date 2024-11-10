import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaveRequestComponent } from './update-leaverequests.component';

describe('UpdateLeaverequestsComponent', () => {
  let component: UpdateLeaveRequestComponent;
  let fixture: ComponentFixture<UpdateLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLeaveRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
