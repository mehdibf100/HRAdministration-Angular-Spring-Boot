import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAttendanceHrComponent } from './nav-bar-attendance-hr.component';

describe('NavBarAttendanceHrComponent', () => {
  let component: NavBarAttendanceHrComponent;
  let fixture: ComponentFixture<NavBarAttendanceHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarAttendanceHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarAttendanceHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
