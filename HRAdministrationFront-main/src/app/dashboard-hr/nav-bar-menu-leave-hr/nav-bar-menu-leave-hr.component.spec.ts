import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarMenuLeaveHrComponent } from './nav-bar-menu-leave-hr.component';

describe('NavBarMenuLeaveHrComponent', () => {
  let component: NavBarMenuLeaveHrComponent;
  let fixture: ComponentFixture<NavBarMenuLeaveHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarMenuLeaveHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarMenuLeaveHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
