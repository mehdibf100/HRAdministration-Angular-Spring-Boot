import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarMenuLeaveComponent } from './nav-bar-menu-leave.component';

describe('NavBarMenuLeaveComponent', () => {
  let component: NavBarMenuLeaveComponent;
  let fixture: ComponentFixture<NavBarMenuLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarMenuLeaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarMenuLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
