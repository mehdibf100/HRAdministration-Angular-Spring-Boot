import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAttendancesComponent } from './nav-bar-attendances.component';

describe('NavBarAttendancesComponent', () => {
  let component: NavBarAttendancesComponent;
  let fixture: ComponentFixture<NavBarAttendancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarAttendancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
