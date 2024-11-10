import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarMenuComplaintsHrComponent } from './nav-bar-menu-complaints-hr.component';

describe('NavBarMenuComplaintsHrComponent', () => {
  let component: NavBarMenuComplaintsHrComponent;
  let fixture: ComponentFixture<NavBarMenuComplaintsHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarMenuComplaintsHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarMenuComplaintsHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
