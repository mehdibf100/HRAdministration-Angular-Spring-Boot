import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarMenuHrComponent } from './nav-bar-menu-hr.component';

describe('NavBarMenuHrComponent', () => {
  let component: NavBarMenuHrComponent;
  let fixture: ComponentFixture<NavBarMenuHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarMenuHrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarMenuHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
